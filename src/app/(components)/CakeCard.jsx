"use client";

import {format} from "date-fns";
import { Trash } from "lucide-react";

function CakeCard({ cake }) {

  async function handleDelete() {
    const res = await fetch(`/api/cakes/${cake.id}`, {
        method: 'DELETE',
    });

    const data = await res.json();
    if (res.ok) {
        console.log('Pastel eliminado:', data);
        window.location.reload();
        
    } else {
        console.error('Error al eliminar el pastel:', data.message);
    }



}


  return (
    <div
      className="bg-white rounded-lg shadow-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer w-full"
      
    >
      {cake.image && <img src={cake.image} className="w-full rounded-lg h-[400px]" alt="" />}
      <div className="p-4">
        <h2 className="text-xl text-slate-600">{cake.description}</h2>
        <p>{format(cake.createdAt, "dd/MM/yyyy")}</p>
        <div className="w-full h-[45px] flex justify-end items-center">
          <button className="w-10 h-10 text-white bg-pink-900 bg-opacity-50 flex items-center justify-center rounded-lg shadow-md hover:bg-opacity-80 " onClick={handleDelete}>
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CakeCard;
