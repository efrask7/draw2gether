# Draw2Gether

Aplicación en tiempo real que permite a múltiples usuarios dibujar simultáneamente. Esta plataforma colaborativa está diseñada para facilitar la creatividad y la comunicación visual entre los usuarios, permitiéndoles trabajar juntos en un canvas compartido desde cualquier lugar del mundo. La aplicación no permite la creación de salas, sino que todos los usuarios comparten un único canvas.

La aplicación está desplegada y funcionando en [draw2gether.efrask.dev](https://draw2gether.efrask.dev).

## Tecnologías Utilizadas

- **Frontend:**
  - Next.js
  - React
  - Tailwind CSS
  - Socket.IO Client

- **Backend:**
  - Express
  - Socket.IO

## Funcionalidades

- **Chat Grupal:** Los usuarios pueden comunicarse en tiempo real a través de un chat grupal.
- **Canvas Compartido:** Los usuarios pueden dibujar en un canvas compartido utilizando diversas herramientas como lápiz, goma de borrar, línea, rectángulo y círculo.
- **Persistencia del Canvas:** El estado del canvas se guarda en el servidor, permitiendo a los usuarios ver los cambios realizados por otros en tiempo real.
- **Sincronización en Tiempo Real:** Los cambios en el canvas y el chat se sincronizan instantáneamente entre todos los usuarios conectados.
- **Herramientas de Dibujo:** Incluye herramientas avanzadas de dibujo para mejorar la experiencia del usuario.

## Instalación y Ejecución

1. Clona el repositorio y cambia al branch `dev` para el frontend:
   ```sh
   git clone -b dev https://github.com/tu_usuario/draw2gether.git
   ```
2. Instala las dependencias del frontend con `npm install`.
3. Ejecuta el servidor de desarrollo del frontend con `npm run dev`.
4. En otra terminal, clona el repositorio y cambia al branch `dev_server` para el backend:
   ```sh
   git clone -b dev_server https://github.com/tu_usuario/draw2gether.git
   ```
5. Instala las dependencias del backend con `npm install`.
6. Ejecuta el servidor de desarrollo del backend con `npm run dev`.
7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.