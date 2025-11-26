# Resumen del proyecto
Proyecto de ejemplo que implementa la prueba técnica usando Next.js (App Router), TypeScript, Zustand, TanStack Query/Table, Shadcn UI, manejo de cookies y APIs públicas (ReqRes, JSONPlaceholder, OpenLibrary).

---

## Tecnologías principales
| Tecnología | Uso principal |
|---|---|
| Next.js 15 (App Router) | Estructura, rutas, CSR/SSR, middleware |
| TypeScript | Tipado estricto |
| Zustand | Estado global (auth, roles, favoritos) |
| TanStack Query | Data-fetching, cache, mutations, optimistic updates |
| TanStack Table | Tablas dinámicas con paginación real |
| TailwindCSS + Shadcn UI | UI y componentes accesibles |
| Next.js Cookies API | Manejo de tokens, refresh, logout |
| ReqRes / JSONPlaceholder / OpenLibrary | APIs públicas usadas por features |

---

## Estructura del proyecto
```
src/
 ├── app/
 │   ├── (protected)/
 │   │    ├── books/
 │   │    ├── posts/
 │   │    └── users/
 │   ├── api/
 │   │    └── bulk/  (simulacion de bulk usuarios)
 │   ├── login/
 │   ├── globals.css
 │   ├── layout.tsx
 │   ├── page.tsx
 │   └── providers.tsx
 ├── components/
 │   ├── ui/  (botones, inputs, modales, sidebar)
 │   ├── app-sidebar.tsx
 │   ├── books-filter.tsx
 │   ├── books-table.tsx
 │   └── user-table.tsx
 ├── hooks/           (useUsers, usePosts, useBooks, useAuth)
 ├── lib/             (queryClient, fetchWrapper, utils)
 ├── services/        (reqres, jsonplaceholder, openlibrary)
 ├── stores/          (auth.store, favorites.store)
 └── utils/
```

---

## Autenticación
Flujo:
- Login → `POST /api/auth/login`
- Cookies:
    - `accessToken`: cookie accesible por JS
    - `refreshToken`: HttpOnly, Secure, SameSite=Lax
- Refresh automático via `POST /api/auth/refresh` usado por `fetchWrapper.ts`
- Logout → `POST /api/auth/logout` (limpia cookies y Zustand)
- Protección de rutas con `middleware.ts` (bloqueo de `/users`, `/posts`, `/books` sin token)

---

## Módulos principales

### Gestión de usuarios — ReqRes
- Tabla con TanStack Table y paginación real (`GET /api/users?page=`)
- Búsqueda frontend, filtros simulados por rol, bulk actions (borrar/cambiar rol)
- Archivo principal: `src/components/user-table.tsx`

### Posts — JSONPlaceholder
- Listado de posts por usuario, detalle con comentarios
- Crear/editar con TanStack Mutation y optimistic updates
- Permisos por rol (solo admin crea/edita)
- Favoritos guardados en Zustand
- Rutas: `src/app/(protected)/posts`

### Buscador de Libros — Open Library
- Búsqueda por título, filtros por autor/año
- Paginación usando `start` / `numFound`
- Detalle en `src/app/(protected)/books/[id]`
- Archivos clave: `books-table.tsx`, `books-filter.tsx`, `useBooks.ts`

---

## Buenas prácticas aplicadas
- Arquitectura modular (hooks, stores, services, components)
- Tipado fuerte en servicios y hooks
- Manejo de loading y errores
- Diseño responsive con Tailwind + Shadcn UI
- Cookies y refresh correctamente implementados
- Código comentado en puntos críticos (auth, refresh, optimistic updates)

---

## Cómo ejecutar
```bash
git clone <repo-url>
cd <project-folder>
npm install
npm run dev
# Visitar: http://localhost:3000/login
```

---

## Variables de entorno (ejemplo)
```
# No se requieren secretos reales; APIs son públicas
NEXT_PUBLIC_API_URL=https://reqres.in/api
NEXT_PUBLIC_JSONPLACEHOLDER=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_OPENLIBRARY=https://openlibrary.org
```

---

## Scripts útiles
```bash
npm run dev     # Desarrollo
npm run build   # Build producción
npm run start   # Ejecutar build
npm run lint    # Linting
npm run test    # Tests
```
