import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/gallery",
    "/upload",
    "/users",
    "/user/new",
    "/user/edit",
  ],
};

// Extender el middleware para eliminar cookies cuando se hace logout
export function middleware(req) {
  // Verificar si la ruta es '/auth/logout' para manejar el cierre de sesión
  if (req.nextUrl.pathname === "/auth/logout") {
    const res = NextResponse.next();

    // Nombre de la cookie de sesión que NextAuth usa por defecto
    const sessionCookieName = "__Secure-next-auth.session-token";

    // Eliminar la cookie de sesión
    if (req.cookies.get(sessionCookieName)) {
      res.cookies.set(sessionCookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0, // Expira inmediatamente
      });
    }

    // Redirigir al usuario a la página de login después de hacer logout
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Llamar al middleware original de next-auth para las otras rutas
  return withAuth(req);
}
