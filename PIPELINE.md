# Funcionamiento del Pipeline CI/CD

## Introducción

En esta práctica trabajé con GitHub Actions para hacer que las pruebas y la publicación de mi aplicación se realizaran automáticamente. La idea era que cada vez que subiera algún cambio a GitHub, el sistema revisara si todo estaba bien antes de publicar la aplicación.

## Etapas del pipeline

### 1. Preparación del proyecto

Lo primero que hice fue subir mi proyecto a GitHub y comprobar que los archivos estuvieran correctamente organizados. Luego configuré GitHub Pages para poder publicar la aplicación.

Cuando subo algún cambio, GitHub Actions se encarga de preparar el entorno e instalar lo necesario para ejecutar las pruebas.

### 2. Pruebas automáticas

En esta parte utilicé Jest y Supertest para comprobar que las funciones de la aplicación trabajaran correctamente.

Al principio tenía 6 pruebas, pero después agregué 4 más para verificar la nueva función de eliminar tareas.

Al final conseguí que las 10 pruebas pasaran correctamente y obtuve un 100% de cobertura de líneas.

### 3. Construcción con Docker

En esta etapa, GitHub Actions comprueba que se pueda construir la imagen Docker de la aplicación.

Esto sirve para tener el proyecto preparado para ejecutarse dentro de un contenedor.

### 4. Publicación en GitHub Pages

Después de pasar las pruebas, el pipeline continúa con la publicación de la página.

Al principio tuve un problema porque no había configurado GitHub Pages, pero después de activar la opción de GitHub Actions pude realizar el despliegue correctamente.

## Prueba de error y corrección

Para comprobar que el pipeline realmente detectaba los errores, cambié una prueba a propósito. Hice que esperara una respuesta diferente a la que realmente daba la aplicación.

Cuando ejecuté las pruebas, una falló y las otras 9 pasaron. Después subí ese cambio a GitHub y pude ver que el pipeline aparecía en rojo y no continuaba con la publicación.

Luego corregí la prueba, volví a subir los cambios y esta vez el pipeline terminó en verde.

## Resultados obtenidos

- Conseguí que las 10 pruebas funcionaran correctamente.
- Obtuve un 100% de cobertura de líneas.
- Comprobé que GitHub Actions detecta las pruebas fallidas.
- Logré corregir el error y ejecutar el pipeline nuevamente.
- Pude publicar la versión estática de mi aplicación en GitHub Pages.

## Conclusión

Con esta práctica pude entender mejor cómo funciona un pipeline CI/CD. Al principio tuve algunos problemas con la configuración, pero fui resolviéndolos paso a paso. Lo que más me ayudó a comprender su funcionamiento fue provocar un error y ver cómo GitHub Actions detenía el proceso. Después de corregirlo, pude comprobar que todo volvía a funcionar. En general, fue una práctica que me ayudó a conocer mejor estas herramientas y cómo se utilizan al trabajar con proyectos de software.