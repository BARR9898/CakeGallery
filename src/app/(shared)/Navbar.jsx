// /app/navbar.js
'use client';
import { signOut } from "next-auth/react";
import Link from 'next/link';
import { GalleryHorizontal ,Plus,LogOut,Users} from 'lucide-react';
export default function Navbar() {
  function handleLogout() {
    console.log('saliendo');
    
    signOut({ callbackUrl: "/auth/login" })
  }
  return (
    <nav className='w-100 h-24 bg-pink-100  shadow-lg'>
      <ul className='flex justify-between items-center h-full space-x-1'>
        <button className='w-32 h-16 bg-pink-900 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/gallery"><GalleryHorizontal className='text-purple-200'></GalleryHorizontal></Link></button>
        <button className='w-32 h-16 bg-pink-900 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/upload"><Plus className='text-purple-200'></Plus></Link></button>
        <button className='w-32 h-16 bg-pink-900 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/users" ><Users className='text-purple-200'></Users></Link></button>
        <button className='w-32 h-16 bg-pink-900 bg-opacity-80 shadow-lg hover:bg-opacity-70 font-bold text-2xl rounded flex items-center justify-center'><Link href="/" onClick={handleLogout}><LogOut className='text-purple-200'></LogOut></Link></button>
      </ul>
    </nav>
  );
}
