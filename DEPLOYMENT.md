# Despliegue de la aplicación

## Introducción

En esta parte voy a explicar cómo logré publicar mi aplicación utilizando GitHub Pages y GitHub Actions. Al principio tuve algunos inconvenientes, pero pude solucionarlos y conseguir que el proyecto se publicara correctamente.

## Preparación del proyecto

Lo primero que hice fue comprobar que la aplicación funcionara en mi computadora. Para eso instalé las dependencias, ejecuté las pruebas y abrí la aplicación desde el navegador.

Después creé un repositorio público en GitHub y subí los archivos del proyecto utilizando Git.

## Configuración de GitHub Pages

Cuando subí el proyecto, GitHub Actions comenzó a ejecutar el pipeline automáticamente, pero el primer intento de despliegue falló.

Al revisar el error, descubrí que todavía no había configurado GitHub Pages.

Para solucionarlo, entré a la configuración del repositorio, busqué la sección Pages y seleccioné GitHub Actions como opción de publicación.

Después volví a ejecutar el pipeline y esta vez la aplicación se publicó correctamente.

## Comprobación del despliegue

Luego abrí el enlace de GitHub Pages para comprobar que la página estuviera disponible.

La versión publicada muestra la interfaz de la aplicación, pero para utilizar las funciones que dependen del servidor Express es necesario ejecutarla localmente con Node.js.

## Pruebas antes de publicar

También comprobé que GitHub Actions no continuara con el despliegue cuando alguna prueba fallaba.

Para hacerlo, provoqué un error intencional en una prueba y subí el cambio a GitHub. El pipeline detectó el problema y detuvo la publicación.

Después corregí el error, volví a subir los cambios y el despliegue terminó correctamente.

## Enlaces del proyecto

**Repositorio de GitHub:**

https://github.com/keytherminyety02-tech/devops-itla-practica3

**Aplicación publicada:**

https://keytherminyety02-tech.github.io/devops-itla-practica3/

## Conclusión

Con este proceso aprendí cómo publicar una aplicación utilizando GitHub Actions y GitHub Pages. También entendí que no basta con subir los archivos a GitHub, sino que hay que configurar bien el despliegue y comprobar que las pruebas funcionen antes de publicar los cambios.