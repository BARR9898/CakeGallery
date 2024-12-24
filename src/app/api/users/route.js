import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../libs/prisma"; // Verifica que la ruta sea correcta

export async function POST(request) {
    try {
        const data = await request.json();
        console.log("Data received:", data); // Verifica los datos

        // Verificar si el usuario ya existe
        const userFound = await prisma.user.findUnique({
            where: {
                phone: data.phone,
            },
        });

        if (userFound) {
            return new NextResponse(
                JSON.stringify({ message: "Usuario ya existe" }),
                { status: 400 }
            );
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Crear un nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                username: data.username,
                phone: data.phone,
                password: hashedPassword, // Asegúrate de almacenar la contraseña encriptada
            },
        });

        // Excluir el campo de la contraseña del objeto de usuario para la respuesta
        const { password: _, ...user } = newUser;

        // Retornar respuesta exitosa
        return new NextResponse(
            JSON.stringify({
                message: "Registro exitoso",
                newUser: user,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Obtiene todos los usuarios desde la base de datos
        const users = await prisma.user.findMany();
        console.log("API GET users:", users);

        // Retorna los usuarios en formato JSON
        return NextResponse.json(users);
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
