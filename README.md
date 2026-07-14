# Landing Page de Portal de Noticias Digital
## Introducción
Este proyecto es un portal de noticias digital que permite a los usuarios registrarse, iniciar sesión y gestionar noticias.

## Stack
* Frontend: React
* Backend: Node.js con Express.js
* Base de datos: MongoDB
* Autenticación: JSON Web Tokens (JWT)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/usuario/repositorio.git`
2. Instalar dependencias: `npm install`
3. Iniciar el servidor: `npm start`

## Docker
1. Construir la imagen: `docker build -t noticias-digital .`
2. Iniciar el contenedor: `docker run -p 5000:5000 noticias-digital`

## Endpoints
La API tiene los siguientes endpoints:
* **POST /api/auth/register**: Registrar un nuevo usuario
* **POST /api/auth/login**: Iniciar sesión de usuario
* **POST /api/auth/refresh-token**: Refrescar token (requiere autenticación)
* **GET /api/news**: Listar noticias (no requiere autenticación)
* **POST /api/news**: Crear noticia (requiere autenticación)
* **GET /api/news/:id**: Obtener noticia por ID (no requiere autenticación)
* **PUT /api/news/:id**: Actualizar noticia (requiere autenticación)
* **DELETE /api/news/:id**: Eliminar noticia (requiere autenticación)

## Modelo de Noticia
El modelo de noticia tiene los siguientes campos:
* **title**: Título de la noticia (String)
* **content**: Contenido de la noticia (String)
* **author**: Autor de la noticia (String)
* **createdAt**: Fecha de creación de la noticia (Date)

## Seguridad
La seguridad es un aspecto importante en este proyecto. Se utilizan JSON Web Tokens (JWT) para autenticar a los usuarios y proteger los endpoints. Los tokens se generan al iniciar sesión y se refrescan periódicamente. Los endpoints que requieren autenticación están marcados con **auth: true** en la lista de endpoints.

**Configuración de seguridad**:
* La variable de entorno `MONGO_URI` debe estar configurada con la URI de la base de datos de MongoDB.
* La variable de entorno `JWT_SECRET` debe estar configurada con una cadena secreta para firmar los tokens JWT.
* El puerto de la API es **5000**.