import UserCard from "../(components)/UserCard";
export const dynamic = 'force-dynamic'; // Si necesitas forzar comportamiento dinámico
import Link from "next/link";

async function Users() {
    async function loadUsers() {
        const res = await fetch('http://localhost:3000/api/users'); // Llama a la API a través de HTTP
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        return res.json();
    }

    const users = await loadUsers();

    return (
        <div className="grid gap-4 grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-9 p-2 flex items-center justify-center my-2">
                <h1 className="text-3xl font-bold">Usuarios</h1>
            </section>

            <section className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 h-9 flex justify-center items-center mt-[30px]">
                <Link href="/users/new"> {/* Redirige a /users/new */}
                    <button className="w-[200px] font-bold h-16 bg-pink-900 hover:bg-opacity-70 text-white rounded-lg shadow-md p-2 flex items-center justify-center">
                        Crear Usuario
                    </button>
                </Link>
            </section>

            {users.map(user => (
                <UserCard user={user} key={user.id} />
            ))}
        </div>
    );
}

export default Users;
