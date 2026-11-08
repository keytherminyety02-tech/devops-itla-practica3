# Práctica 3 — Pipeline CI/CD con GitHub Actions

**Instituto Tecnológico de las Américas (ITLA)**  
**Asignatura:** Electiva 1 — DevOps  
**Período:** 2026-C-3  
**Estudiante:** Keyther Minyety  
**Matricula:** 2025-1998
**Repositorio:** https://github.com/keytherminyety02-tech/devops-itla-practica3  
**Aplicación publicada:** https://keytherminyety02-tech.github.io/devops-itla-practica3/

## 1. Descripción del proyecto

En este proyecto trabajamos con una aplicación web de lista de tareas, utilizando Node.js, Express y GitHub Actions. El objetivo fue aprender a automatizar las pruebas y el despliegue de la aplicación, de manera que cada vez que realizamos un cambio en el código, el sistema pueda comprobar si todo funciona correctamente.

Partimos de la plantilla proporcionada por el profesor y le agregamos nuevas funciones, como la opción de eliminar tareas. También incorporamos pruebas para verificar que estas funciones trabajen correctamente.

Además, configuramos el despliegue en GitHub Pages y realizamos algunas pruebas con errores intencionales para comprobar cómo reacciona el pipeline cuando algo falla y qué sucede después de corregirlo.

## 2. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| Node.js | Entorno de ejecución de JavaScript |
| Express | Desarrollo de la API |
| Jest | Pruebas automatizadas |
| Supertest | Pruebas de integración HTTP |
| Git y GitHub | Control de versiones |
| GitHub Actions | Automatización del pipeline CI/CD |
| GitHub Pages | Publicación del frontend estático |
| Docker | Construcción de una imagen de la aplicación |

## 3. Estructura del proyecto

```text
plantilla-devops-itla/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   └── index.html
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   └── app.test.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 4. Requisitos

- Cuenta gratuita de GitHub.
- Git instalado.
- Node.js versión 20 o superior.
- npm.
- Visual Studio Code u otro editor.
- Docker Desktop (opcional para ejecutar el contenedor localmente).

## 5. Instalación y ejecución local

Clonar el repositorio:

```bash
git clone https://github.com/keytherminyety02-tech/devops-itla-practica3.git
```

Entrar al proyecto:

```bash
cd devops-itla-practica3
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar las pruebas:

```bash
npm test
```

Iniciar el servidor:

```bash
npm start
```

Abrir la aplicación en:

http://localhost:3000

**Nota para Windows:** Si PowerShell bloquea `npm.ps1`, se pueden utilizar `npm.cmd install`, `npm.cmd test` y `npm.cmd start`.

## 6. Funcionalidades de la aplicación

La aplicación permite agregar, ver, completar y eliminar tareas. También cuenta con funciones para comprobar que el servidor esté funcionando correctamente.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Comprueba el estado del servidor |
| GET | `/metrics` | Consulta las métricas |
| GET | `/api/tareas` | Lista las tareas |
| POST | `/api/tareas` | Crea una tarea |
| PATCH | `/api/tareas/:id` | Cambia el estado de una tarea |
| DELETE | `/api/tareas/:id` | Elimina una tarea |

La funcionalidad DELETE se incorporó como parte de la Práctica 3. Devuelve una confirmación cuando la eliminación es correcta y un error HTTP 404 cuando la tarea no existe.

Los datos se almacenan temporalmente en memoria, por lo que no persisten cuando se reinicia el servidor.

## 7. Pruebas automatizadas

Se utiliza Jest junto con Supertest para verificar las respuestas HTTP y el comportamiento de la API.

La plantilla original incluía seis pruebas. Durante la práctica se agregaron cuatro pruebas nuevas:

1. Eliminar una tarea existente.
2. Devolver 404 cuando se intenta eliminar una tarea inexistente.
3. Comprobar que eliminar una tarea no afecta a las demás.
4. Verificar que los identificadores no se repiten después de eliminar tareas.

### Resultados locales

| Indicador | Resultado |
|---|---|
| Pruebas totales | 10 |
| Pruebas aprobadas | 10 |
| Cobertura de instrucciones | 95.65% |
| Cobertura de ramas | 85.71% |
| Cobertura de funciones | 100% |
| Cobertura de líneas | 100% |

Estos resultados corresponden a la ejecución local realizada durante la práctica.

## 8. Pipeline CI/CD

El pipeline está configurado en:

`.github/workflows/ci.yml`

GitHub Actions ejecuta automáticamente el workflow cuando se envían cambios a la rama principal.

### Etapa 1: Build y pruebas

Esta etapa prepara el entorno de ejecución, instala las dependencias, realiza las comprobaciones configuradas en el workflow y ejecuta las pruebas automatizadas.

También comprueba la construcción de la imagen Docker.

Si las pruebas fallan, el trabajo termina con error y el despliegue dependiente no continúa.

### Etapa 2: Despliegue a GitHub Pages

Cuando la etapa anterior termina correctamente, GitHub Actions prepara los archivos estáticos, genera el artefacto de publicación y realiza el despliegue en GitHub Pages.

El sitio está disponible en:

https://keytherminyety02-tech.github.io/devops-itla-practica3/

GitHub Pages publica únicamente la versión estática. Para utilizar la API Express es necesario ejecutar el servidor en un entorno compatible con Node.js.

## 9. Demostración de fallo y corrección

Durante la práctica se realizó una demostración para comprobar que el pipeline detecta errores.

### Fallo intencional

Se modificó temporalmente la prueba del endpoint `/health` para esperar una respuesta HTTP 500, aunque la aplicación devuelve correctamente HTTP 200.

El resultado local fue:

- 9 pruebas aprobadas.
- 1 prueba fallida.
- 10 pruebas ejecutadas.

El cambio se envió a GitHub, provocando que el trabajo Build y pruebas terminara en rojo. Como consecuencia, el despliegue a GitHub Pages fue omitido.

### Corrección del error

Posteriormente se restauró la expectativa HTTP 200 y se enviaron los cambios al repositorio.

GitHub Actions volvió a ejecutar el pipeline y ambas etapas finalizaron correctamente.

**Ejecución exitosa:** CI/CD #5  
**Commit:** `47e5152`  
**Duración total:** 58 segundos  
**Estado:** Success

Esto demuestra que el pipeline permite identificar errores antes del despliegue y continuar la publicación cuando las pruebas se aprueban.

## 10. Ejecutar con Docker

Construir la imagen:

```bash
docker build -t tareas-devops .
```

Ejecutar el contenedor:

```bash
docker run -p 3000:3000 tareas-devops
```

La aplicación estará disponible en:

http://localhost:3000

El Dockerfile proporcionado incluye una comprobación de salud del contenedor.

## 11. Configuración de GitHub Pages

Para configurar el despliegue:

1. Crear un repositorio público en GitHub.
2. Subir los archivos del proyecto, incluido el workflow.
3. Entrar en Settings.
4. Seleccionar Pages.
5. Elegir GitHub Actions como fuente de publicación.
6. Ejecutar el pipeline mediante un push a la rama main.
7. Comprobar que las etapas finalicen correctamente.

No es necesario utilizar Azure ni contratar servicios de pago.

## 12. Práctica 3 — Requisitos implementados

- [x] Agregar al menos dos pruebas nuevas.
- [x] Implementar una funcionalidad adicional.
- [x] Comprobar la cobertura de código.
- [x] Ejecutar las pruebas automáticamente con GitHub Actions.
- [x] Provocar un fallo intencional.
- [x] Demostrar el pipeline en rojo.
- [x] Corregir el fallo y recuperar el estado verde.
- [x] Publicar el frontend en GitHub Pages.
- [x] Explicar las etapas del pipeline.

## 13. Proyecto Final — Posibles ampliaciones

La plantilla original propone las siguientes mejoras para un proyecto posterior:

- Implementar persistencia mediante SQLite o MongoDB.
- Publicar imágenes Docker en GitHub Container Registry.
- Incorporar análisis estático con ESLint.
- Definir umbrales mínimos de cobertura.
- Utilizar métricas y logs JSON para monitoreo.
- Configurar alertas ante errores.
- Preparar un manual de operaciones y documentar las lecciones aprendidas.

Estas ampliaciones se consideran trabajo futuro y no forman parte de las funcionalidades implementadas en esta práctica.

## 14. Conclusión

Con esta práctica aprendí cómo funcionan las pruebas automáticas y cómo podemos publicar una aplicación usando GitHub Actions. También pude ver qué pasa cuando hay un error en el código y cómo, al corregirlo, todo vuelve a funcionar. Fue una buena experiencia porque pude poner en práctica lo aprendido en clase y conocer mejor las herramientas que se utilizan en DevOps.