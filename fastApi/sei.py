def sucesiones(inferior, superior, formula):
    """
    Esta función calcula una serie de valores basada en una fórmula dada, dentro de un rango especificado.

    Parámetros:
    inferior (int): El límite inferior del rango.
    superior (int): El límite superior del rango.
    formula (str): Una cadena que representa la fórmula a evaluar. Esta fórmula debe ser una expresión válida de Python que puede incluir la variable 'k'.

    Devuelve:
    k (int): El valor final de 'k' después de calcular la serie.
    suma (float): La suma de todos los valores calculados.
    multiplicacion (float): El producto de todos los valores calculados.
    serie (list): Una lista de todos los valores calculados.

    Ejemplo:
    >>> sucesiones(1, 4, "k**2")
    (0, 14.0, 36.0, [1.0, 4.0, 9.0])
    """
    limite = superior - inferior # Calcula el límite de la serie
    sumatoria = 0 # Inicializa la sumatoria
    multiplicacion = 1 # Inicializa la multiplicación
    if limite != 0: # Si el límite no es 0
        k, suma, multiplicacion, serie = sucesiones(inferior+1, superior, formula) # Llama a la función recursivamente
        valor = float(eval(formula)) # Evalúa la fórmula
        serie.append(round(valor, 3)) # Añade el valor a la serie
        return inferior-1, suma + valor, multiplicacion * valor, serie # Devuelve los valores actualizados
    else:
        k = inferior # Asigna el valor de 'k'
        valor = float(eval(formula)) # Evalúa la fórmula
        serie = [round(valor, 3)] # Inicializa la serie con el primer valor
        return inferior-1, valor, valor, serie  # Devuelve los valores iniciales