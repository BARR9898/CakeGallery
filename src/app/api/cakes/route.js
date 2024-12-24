import { NextResponse } from 'next/server';
import prisma from "../../../libs/prisma"
import  cloudinary from "../../../libs/cloudinary"
import {processImage} from "../../../libs/processImage"

export async function GET() {
  try {
    // Obtiene todos los pasteles desde la base de datos
    const cakes = await prisma.cake.findMany();
    console.log('api get cakes',cakes);
    return cakes
  } catch (error) { 
    console.log(error);
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



export async function POST(request) {
    try {
      const data = await request.formData();
      console.log('data',data);
      
      const image = data.get("image");
  
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
  
      // Procesa la imagen y obtén el buffer
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
                reject(err);
              }
  
              resolve(result);
            }
          )
          .end(buffer);
      });

      console.log('res cloudinary',res);    
      
  
      // Guarda el pastel en la base de datos usando Prisma
      const cake = await prisma.cake.create({
        data: {
          description: data.get("description"),
          image: res.secure_url, // URL de la imagen cargada
        },
      });
  
      return NextResponse.json(cake);
    } catch (error) {
      console.error(error);
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
  