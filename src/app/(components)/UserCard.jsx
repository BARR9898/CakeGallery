"use client";

import {format} from "date-fns";
import { Trash,User,Edit } from "lucide-react";
import {DELETE} from "../api/users/[id]/route"
import { useRouter } from "next/navigation"; // Importa el hook useRouter

function CakeCard({ user }) {
  
  const router = useRouter(); // Inicializa el router

  async function handleDelete() {
    const res = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
    });

    const data = await res.json();
    if (res.ok) {
        console.log('Usuario eliminado:', data);
        window.location.reload();
        
    } else {
        console.error('Error al eliminar usuario:', data.message);
    }



}

const handleEdit = () => {
  // Redirige a la página de edición del usuario con su ID
  router.push(`/users/edit/${user.id}`);
};

  return (
    <div
      className="bg-white rounded-lg shadow-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer w-full mt-9"
    >

      <section className="user-profile w-full h-[350px] flex justify-center items-center border-2 rounded-lg shadow">
      <User className="w-[250px] rounded-lg h-[200px]"></User>

      </section>
      <div className="p-4">
        <h2 className="text-xl text-slate-600 font-bold my-2">{user.username}</h2>
        <p className="">Teléfono: {user.phone}</p>
        <p className="">Fecha de creación: {format(user.createdAt, "dd/MM/yyyy")}</p>
        <div className="w-full h-[45px] flex justify-end items-center mt-3">
          <button className="w-16 h-10 text-white bg-pink-900 bg-opacity-50 flex items-center justify-center rounded-lg shadow-md hover:bg-opacity-80 " onClick={handleDelete}>
            <Trash size={20} />
          </button>
          <button className="w-16 h-10 text-white bg-pink-900 bg-opacity-50 flex items-center justify-center rounded-lg shadow-md hover:bg-opacity-80 ml-3 " onClick={handleEdit}>
            <Edit size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CakeCard;
