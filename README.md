# TaskManager
Practica Fulltack desarrollada con :  RactJs + Express + MongoDB + Typescript + Socket.io y más..

![main1](https://raw.githubusercontent.com/renier1989/taskmanager_frontend/main/src/assets/main1.jpg)
![main1](https://raw.githubusercontent.com/renier1989/taskmanager_frontend/main/src/assets/main2.jpg)

# Descripción

Este es un proyecto Fullstack, con el que podrás registrarte, confirmar tu cuenta y recuperar tu contraseña. Podrás iniciar sesión con tu usuario son Autenticación JWT y administrar tus proyectos y completar tareas. También podrás colaborar en otros proyectos de otros usuarios completando tareas o también podrás agregar colaboradores a tus proyectos. Como ultima funcionalidad también podrás hacer todos estos procesos en Tiempo real gracias a Socket.io, cuando crear, editar, completas o actualizas tareas, tus colaboradores podrás ver en tiempo real estos procesos y viceversa.

### Características:

- Registro de nuevos usuarios
- Confirmar tu cuenta
- Recuperar Contraseña
- inicio de Sesión con JWT
- Administras tu Proyectos
- CRUD de tareas en los proyectos
- Añadir Colaboradores a tus proyectos
- Colaborar en proyectos de otros usuarios
- CRUD de Tares en Tiempo real (Socket.io)


# Demo

Puedes darle un vistazo al proyecto en ejecución [aqui](https://taskmanager-frontend-renier1989.vercel.app/)

#### Notas: 
El proyecto cuenta con envío de correos para algunas proceso de registro, confirmación y recuperación de contraseña, estos proceso de envío de correo los desarrollo con [Nodemailer](https://nodemailer.com/) usando [MailTrap.io](https://mailtrap.io/) para hacer las pruebas respectivas en el entorno local.

Si deseas probar las funcionalidades de la aplicación puedes ingresar con estos usuarios de prueba:

```bash
  USUARIOS DE PRUEBA:
  Email :     user1@test.com    |    Email :     user2@test.com
  Password :  user1@test.com    |    Password :  user2@test.com
```



# Tecnologías

**Frontend:** React, Typscript, TailwindCSS, Context Api, Socket.io(client), React-rouet-dom, Axios, HeadlessUi, Vite.

**Backend:** NodeJs, Express, MongoDB, Typescript, Socket.io, JWT.


# ⚙ Instalación

Necesitas Node.js (^18) y Vite.js(^5)

Clona el repositorio con (https):
```
git clone https://github.com/renier1989/taskmanager_frontend.git 
```
Cambia el nombre al archivo .env-example a .env y asegurate de contar con las variables de entorno: (por ejemplo para tu entorno local), para conectarte con el backend
```
VITE_BACKEND_URL=http://localhost:4000
```
move to the project folder and Run:
```bash
  cd taskmanager_frontend
  npm install or npm i
  npm run dev
```
    
# Instalación del Backend

para la instalación del Backend puedes ingresar al siguiente repositorio y seguir los pasos de instalación:

[https://github.com/renier1989/taskmanager_backend.git](https://github.com/renier1989/taskmanager_backend.git)






# 💻 About Me
Soy Fullstack Developer,
Puedes conocerme ingresando a mi pagina web personal [🔗](http://reniervargas.com/)