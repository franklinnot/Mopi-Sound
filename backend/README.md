# Configurando el backend para MOPI

Esta documentación te enseña cómo levantar el servicio backend de Mopi, utilizando **Docker** para eliminar problemas de compatibilidad, facilitando el desarrollo y posterior despliegue.

---

### Inicio Rápido
1.  **Crea la imagen Docker (una sola vez o al cambiar dependencias/Dockerfile):**

    ```bash
    docker build -t mopi-back-iso .
    ```

    > Esto construye la imagen del backend y la etiqueta como `mopi-back-iso`. Solo necesitas hacer esto cuando el `Dockerfile` o el `requirements.txt` cambien.

2.  **Crea y ejecuta el contenedor para desarrollo:**
    Este comando **monta tu código local dentro del contenedor**. Esto significa que cualquier cambio que hagas en tus archivos en tu máquina se reflejará instantáneamente en el contenedor sin necesidad de reconstruirlo.

      * **Linux/macOS:**
        ```bash
        docker run -d --name mopi-back-container -p 8000:80 -v "$(pwd):/code" mopi-back-iso
        ```
      * **Windows (CMD/PowerShell):**
        ```bash
        docker run -d --name mopi-back-container -p 8000:80 -v "%cd%:/code" mopi-back-iso
        ```

    > El comando `-v` (volume) mapea tu directorio de trabajo actual (`$(pwd)` o `%cd%`) al directorio `/code` dentro del contenedor. El servidor `fastapi dev` detectará automáticamente los cambios en este volumen.

    > **Acceso:** El servicio será accesible en [http://localhost:8000](http://localhost:8000). La documentación de la API estará en [http://localhost:8000/docs](http://localhost:8000/docs).

### Al Realizar Cambios en el `Dockerfile` o `requirements.txt`

Si modificas el `Dockerfile` o añades/eliminas dependencias en `requirements.txt`, necesitarás reconstruir la imagen y relanzar el contenedor:

1.  **Reconstruye la imagen:**

    > Ejecutar el comando del paso 1 de la sección anterior.

2.  **Detén el contenedor actual:**

    ```bash
    docker stop mopi-back-container
    ```

3.  **Elimina el contenedor antiguo:**

    ```bash
    docker rm mopi-back-container
    ```

4.  **Crea y ejecuta un nuevo contenedor con la imagen actualizada:**
    
    > Ejecutar el comando del paso 2 de la sección anterior.

### Utilidades Docker

Comandos útiles para gestionar tu contenedor Docker durante el desarrollo.

  * **Detener el contenedor:**

    ```bash
    docker stop mopi-back-container
    ```

  * **Reiniciar el contenedor:**

    ```bash
    docker start mopi-back-container
    ```

  * **Ver los logs del contenedor (en tiempo real):**

    ```bash
    docker logs -f mopi-back-container
    ```

    > Presiona `Ctrl + C` para salir de los logs sin detener el contenedor.

  * **Verificar el estado de los contenedores en ejecución:**

    ```bash
    docker ps
    ```

    > Te mostrará una lista de los contenedores activos.

---

## Sin Docker (Configuración Local)

Esta sección te guía para configurar y ejecutar el proyecto directamente en tu máquina, útil para pruebas rápidas o depuración sin la capa de Docker. Necesitarás instalar FFmpeg, puedes encontrar la documentación en este [link](https://ffmpeg.org/).

### Inicio Rápido

1.  **Crea el entorno virtual:**

    * **Linux/macOS:**
        ```bash
        python3 -m venv .venv
        ```
    * **Windows (CMD/PowerShell):**
        ```bash
        python -m venv .venv
        ```
    > Un entorno virtual aísla las dependencias del proyecto de las dependencias globales de tu sistema.

2.  **Activa el entorno virtual:**

    * **Linux/macOS:**
        ```bash
        source .venv/bin/activate
        ```
    * **Windows (PowerShell):**
        ```powershell
        .venv\Scripts\Activate.ps1
        ```
    * **Windows (CMD):**
        ```cmd
        .venv\Scripts\activate.bat
        ```
    > Verás el nombre `(.venv)` al inicio de tu línea de comandos si está activo.

3.  **Verifica que el entorno virtual esté activo (opcional):**

    * **Linux/macOS:**
        ```bash
        which python
        ```
    * **Windows (CMD/PowerShell):**
        ```bash
        where python
        ```
    > Esto te mostrará la ruta al ejecutable de Python dentro de tu entorno virtual.

4.  **Instala las dependencias:**

    ```bash
    pip install -r requirements.txt
    ```
    > Esto instalará todas las librerías necesarias para el proyecto.

5.  **Ejecuta el servidor:**

    ```bash
    fastapi dev app/main.py
    ```
    > El servidor estará disponible, por defecto, en [http://127.0.0.1:8000](http://127.0.0.1:8000). Puedes acceder a la documentación interactiva en [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Al Realizar Cambios en las Dependencias

Si instalas nuevas librerías o actualizas las existentes, es buena práctica guardar esos cambios:

```bash
pip freeze > requirements.txt
````

> Esto actualiza el archivo `requirements.txt` con las dependencias actuales de tu entorno virtual.
