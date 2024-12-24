import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const data = await request.json();

        const userFound = await prisma.user.findUnique({
            where: {
                phone: data.phone
            }
        });

        if (userFound) {
            return new NextResponse(
                JSON.stringify({ message: "Usuario ya existe" }),
                { status: 400 } // Puedes ajustar el status según sea necesario
            );
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.user.create({
            data: {
                phone: data.phone,
                password: hashedPassword
            }
        });

        const { password: _, ...user } = newUser;

        return new NextResponse(
            JSON.stringify({
                message: "Registro exitoso",
                newUser: user
            }),
            { status: 201 } // Respuesta exitosa con creación
        );

    } catch (error) {
        console.log(error);
        
        return new NextResponse(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
}
