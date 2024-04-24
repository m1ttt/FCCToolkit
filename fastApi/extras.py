import os
def ComprobadorDeArchivos(nombreArchivo):
    with open(nombreArchivo) as file:
        lineas = file.readlines()

        # Comprueba si el archivo tiene más de 10 líneas
        if len(lineas) > 10:
            return nombreArchivo

        return None
    

def leer_archivos():
    archivos = os.listdir('data')  # Obtiene los archivos
    argumentos = {}

    for archivo in archivos:
        with open(f'data/{archivo}', 'r') as f:
            contenido = f.read().replace('\n', ' ')  # Convierte el contenido a una línea
            prefix = archivo.split("_")[0]  # Obtiene el prefijo del nombre del archivo

            # Asigna el contenido al conjunto correcto según el prefijo
            if prefix == "1":
                argumentos['a'] = contenido
            elif prefix == "2":
                argumentos['b'] = contenido
            elif prefix == "3":
                argumentos['c'] = contenido
            elif prefix == "4":
                argumentos['d'] = contenido

    return argumentos