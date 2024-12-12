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

    const response = await fetch('/api/auth/register',{
      method: 'POST',
      body: JSON.stringify({
          phone: data.phone,
          password: data.password 
      }), 
      headers: {
        'Content-Type': 'application/json'
      } 
    })

    const resJson = await response.json();

    if (response.ok) {
        router.push('/auth/login');
    }else{
      console.log('error',response);

    }
  })

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
      <h1 className="text-slate-200 font-bold mb-4 text-xl">Registrar</h1>
        <label htmlFor="phone" className="text-slate-500 mb-2 block text-sm">Teléfono</label>
        <input
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Contraseña</label>
        <input
         className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
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
        <label htmlFor="phone" className="text-slate-500 mb-2 block text-sm">Confirmar Contraseña</label>
        <input
         className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          type="confirmPassword"
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
        <button className="mt-2 w-full bg-blue-500 text-white p-3 rounded-lg" type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
