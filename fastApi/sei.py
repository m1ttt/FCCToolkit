import math

def sucesiones(inferior, superior, formula):
    """
    Esta función calcula una serie de valores basada en una fórmula dada, dentro de un rango definido por los límites inferior y superior.

    Parámetros:
    inferior (int): El límite inferior del rango.
    superior (int): El límite superior del rango.
    formula (str): Una cadena que representa la fórmula a evaluar. Esta fórmula debe ser una expresión válida de Python que puede incluir la variable 'k'.

    Devuelve:
    k (int): El último valor de k utilizado en la fórmula.
    suma (float): La suma de todos los valores calculados.
    multiplicacion (float): El producto de todos los valores calculados.
    serie (list): Una lista de todos los valores calculados.

    Nota:
    Si el producto de los valores calculados es infinito, la función devolverá math.inf para la multiplicación.
    """
    limite = superior - inferior
    sumatoria = 0
    multiplicacion = 1
    if limite != 0:
        k, suma, multiplicacion, serie = sucesiones(inferior+1, superior, formula)
        valor = float(eval(formula))
        serie.append(round(valor, 3))
        try:
            multiplicacion *= valor
            if not math.isfinite(multiplicacion):  # Comprueba si la multiplicación es infinita
                multiplicacion = math.inf  # Si es así, asigna infinito a la multiplicación
        except OverflowError:  # Captura el error de desbordamiento
            multiplicacion = math.inf  # Asigna infinito a la multiplicación
        return inferior-1, suma + valor, multiplicacion, serie
    else:
        k = inferior
        valor = float(eval(formula))
        serie = [round(valor, 3)]
        return inferior-1, valor, valor, serie
    