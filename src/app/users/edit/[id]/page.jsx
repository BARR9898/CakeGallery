"use client"; // Asegúrate de marcar el componente como cliente

import { useRouter } from "next/navigation"; // Usar 'next/navigation' para redirección
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

function EditUser({ params }) {
  const { id } = params; // Aquí puedes acceder a los parámetros directamente desde `params` 
  const router = useRouter();
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (id) {
      // Solo hace el fetch si 'id' está presente
      fetch(`http://localhost:3000/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user); // Establece los datos del usuario
          setValue("phone", data.user.phone); // Establece los valores en el formulario
          setValue("username", data.user.username); // Establece los valores en el formulario
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    // Enviar los cambios al backend
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        username: data.username,
        phone: data.phone,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        router.push("http://localhost:3000/users"); // Redirige al listado de usuarios
      } else {
        console.log("Error al actualizar el usuario");
      }
    });
  };

  if (!user) return <p>Cargando...</p>; // Muestra "Cargando..." mientras se obtienen los datos

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[450px] w-1/4 md:w-2/4 bg-opacity-30 border-2 shadow-lg bg-pink-100 rounded-lg p-2"
      >
        <h1 className="text-pink-900 font-bold mb-4 text-2xl flex justify-center items-center">
          Editar Usuario
        </h1>

        <label htmlFor="username" className="text-pink-900 mb-2 block text-sm">Username</label>
        <input
          className="p-3 rounded block mb-2 w-full shadow"
          type="text"
          {...register("username", { required: { value: true, message: "Username is required" } })}
          placeholder="username"
        />
        <label htmlFor="phone" className="text-pink-900 mb-2 block text-sm">
          Teléfono
        </label>
        <input
          className="p-3 rounded block mb-2 w-full shadow"
          type="text"
          {...register("phone", { required: true })}
          placeholder="Phone"
        />

        <label htmlFor="password" className="text-pink-900 mb-2 block text-sm shadow">
          Contraseña
        </label>
        <input
          className="p-3 rounded block mb-2 w-full"
          type="password"
          {...register("password")}
          placeholder="Password"
        />

        <button
          className="w-full bg-amber-900 bg-opacity-65 text-white p-3 rounded-lg mt-[60px]"
          type="submit"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditUser;
