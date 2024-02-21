def unir_parentesis(l1, l2):
    """
    Une los elementos de dos listas de igual longitud,
    tomando el elemento más grande de l2 y el elemento correspondiente de l1.

    Args:
        l1 (list): Lista 1.
        l2 (list): Lista 2.

    Returns:
        list: Lista de pares de elementos unidos.
    """
    lista = []
    if len(l1) == len(l2):
        tam = len(l1)
        for i in range(tam):
            for j in range(len(l1) - 1, -1, -1):
                if l2[i] > l1[j]:
                    lista.append([l1[j], l2[i]])
                    l1.remove(l1[j])
                    break

    return lista




def obtener_expresiones(cadena):
    """
    Obtiene todas las expresiones entre paréntesis de una cadena dada.

    Args:
        cadena (str): La cadena de texto.

    Returns:
        list or str: Una lista de expresiones entre paréntesis si se encuentran en la cadena,
        o un mensaje indicando que los paréntesis no coinciden.
    """
    posiciones_apertura = []
    posiciones_cierre = []

    for i in range(len(cadena)):
        if cadena[i] == "(":
            posiciones_apertura.append(i)
        elif cadena[i] == ")":
            posiciones_cierre.append(i)

    if len(posiciones_apertura) == 0 and len(posiciones_cierre) == 0:
        return [cadena]

    uniones = unir_parentesis(posiciones_apertura, posiciones_cierre)

    if len(uniones) != 0:
        subcadenas = []
        for union in uniones:
            subcadenas.append(cadena[union[0] : union[1] + 1])
        subcadenas.append(cadena)
        return sorted(list(set(subcadenas)), key=len)
    else:
        return "Los parentesis no coinciden"


def obtener_variables(cadena):
    """
    Esta función recibe una cadena de texto y devuelve una lista ordenada de las variables presentes en la cadena.

    Parámetros:
    - cadena: una cadena de texto que puede contener variables y otros caracteres.

    Retorna:
    - Una lista ordenada de las variables presentes en la cadena.
    """
    lista_variables = []
    new_cadena = ""
    for caracter in cadena:
        if (
            caracter.isalpha() and caracter not in lista_variables
        ) or caracter.isspace():
            new_cadena += caracter
        else:
            new_cadena += " "
    new_cadena = list(set(new_cadena.split(" ")))
    for new in new_cadena:
        if len(new) == 1:
            lista_variables.append(new)

    return sorted(lista_variables)
