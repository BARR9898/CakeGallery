import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma"
// DELETE: Eliminar pastel
export async function DELETE(request, { params }) {
    const { id } = params;  // Obtenemos el ID del pastel desde los parámetros de la URL

    try {
        // Verificar si el pastel existe
        const cake = await prisma.cake.findUnique({
            where: { id: parseInt(id) }, // Buscar pastel por ID
        });

        if (!cake) {
            return new NextResponse(
                JSON.stringify({ message: "Pastel no encontrado" }),
                { status: 404 }
            );
        }

        // Eliminar el pastel de la base de datos
        await prisma.cake.delete({
            where: { id: parseInt(id) },
        });

        // Responder indicando que el pastel ha sido eliminado
        return new NextResponse(
            JSON.stringify({ message: "Pastel eliminado correctamente" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: "Error al eliminar el pastel", error: error.message }),
            { status: 500 }
        );
    }
}
