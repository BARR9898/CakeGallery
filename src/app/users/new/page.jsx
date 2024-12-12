"use client";
import { redirect } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Register() {

  const { register, handleSubmit , formState:{errors} } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(   async (data) => {

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('/api/users',{
      method: 'POST',
      body: JSON.stringify({
          username: data.username,
          phone: data.phone,
          password: data.password 
      }), 
      headers: {
        'Content-Type': 'application/json'
      } 
    })


    if (response.ok) {
        router.push('/users');
    }else{
      console.log('error',response);

    }
  })

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center ">
      <form onSubmit={handleSubmit(onSubmit)} className=" h-[450px] w-1/4 md:w-2/4  bg-opacity-30 border-2 shadow-lg bg-pink-100 rounded-lg p-2">
      <section className="w-full h-8">
        <h1 className="text-pink-900 font-bold mb-4 text-2xl flex justify-center items-center">Nuevo Usuario</h1>
      </section>
      <label htmlFor="username" className="text-pink-900 mb-2 block text-sm">Username</label>
        <input
          className="p-3 rounded block mb-2  w-full shadow"
          type="text"
          {...register("username", { required: { value: true, message: "Username is required" } })}
          placeholder="username"
        />
        {
          errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )
        }
        
        <label htmlFor="phone" className="text-pink-900 mb-2 block text-sm">Teléfono</label>
        <input
          className="p-3 rounded block mb-2  w-full shadow"
          type="text"
          {...register("phone", { required: { value: true, message: "Phone is required" } })}
          placeholder="Phone"
        />
        {
          errors.phone && (
            <span className="text-red-500 text-sm">
              {errors.phone.message}
            </span>
          )
        }



        <label htmlFor="password" className="text-pink-900 mb-2 block text-sm shadow">Contraseña</label>
        <input
         className="p-3 rounded block mb-2 w-full"
          type="password"
          {...register("password", { required: {value: true, message: "Password is required"} })}
          placeholder="Password"
        />
                {
          errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )
        }
        <label htmlFor="phone" className="text-pink-900 mb-2 block text-sm">Confirmar Contraseña</label>
        <input
         className="p-3 rounded block mb-2 border-2 shadow w-full"
          type="password"
          {...register("confirmPassword", { required: {value: true, message: "Confirm Password is required"} })}
          placeholder="Confirm Password"
        />
                        {
          errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )
        }
        <button className="w-full bg-amber-900 bg-opacity-65 text-white p-3 rounded-lg mt-[60px]" type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
