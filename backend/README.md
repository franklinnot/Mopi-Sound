# Crear entorno virtual:
python3 -m venv .venv

# Añadir .gitignore
echo "*" > .venv/.gitignore

# Activar entorno virtual:
source .venv/bin/activate

# Verificar que el entorno virtual está activo:
which python

# Generar un backup de dependencias
pip freeze > requirements.txt

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
fastapi dev main.py
