import { NextResponse } from 'next/server';
import prisma from "../../../libs/prisma";
import cloudinary from "../../../libs/cloudinary";
import { processImage } from "../../../libs/processImage";

// Función GET para obtener todos los pasteles
export async function GET() {
  try {
    // Obtiene todos los pasteles desde la base de datos
    const cakes = await prisma.cake.findMany();
    console.log('api get cakes', cakes);

    // Devuelve los pasteles como una respuesta JSON válida
    return NextResponse.json({cakes});  // Se devuelve el array dentro de un NextResponse
  } catch (error) {
    console.log(error);

    // Si hay un error, devuelve un mensaje de error con el código de estado 500
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// Función POST para crear un pastel con imagen
export async function POST(request) {
  try {
    const data = await request.formData();  // Obtiene los datos del formulario
    console.log('data', data);

    // Obtiene la imagen del formulario
    const image = data.get("image");

    // Si no hay imagen, devuelve un error con código 400
    if (!image) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    // Procesa la imagen y obtiene el buffer
    const buffer = await processImage(image);

    // Sube la imagen a Cloudinary
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
          async (err, result) => {
            if (err) {
              console.log(err);
              reject(err);  // Si hay un error, lo rechaza
            }

            resolve(result);  // Si todo va bien, devuelve el resultado
          }
        )
        .end(buffer);
    });

    console.log('res cloudinary', res);

    // Guarda el pastel en la base de datos usando Prisma
    const cake = await prisma.cake.create({
      data: {
        description: data.get("description"),
        image: res.secure_url,  // URL de la imagen subida a Cloudinary
      },
    });

    // Devuelve el pastel creado como una respuesta JSON
    return NextResponse.json(cake);
  } catch (error) {
    console.error(error);

    // Si hay un error, devuelve un mensaje de error con código de estado 500
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
