def union(a, b, c=None, d=None):
    if c is None:
        c = []
    if d is None:
        d = []
    result = set(a + b + c + d)
    return sorted(list(result))

def interseccion(a, b, c=None, d=None):
    result = set(a).intersection(b)
    if c is not None and c != []:
        result = result.intersection(c)
    if d is not None and d != []:
        result = result.intersection(d)
    return list(result)

def diferencia(a, b, c=None, d=None):
    if c is None:
        c = []  # Si c no se proporciona, se toma una lista vacía
    if d is None:
        d = []  # Si d no se proporciona, se toma una lista vacía
    result = []
    for element in a:
        if element not in b and element not in c and element not in d:
            result.append(element)
    return result

def difSimetrica(a, b, c=None, d=None):
    if c is None:
        c = []  # Si c no se proporciona, se toma una lista vacía
    if d is None:
        d = []  # Si d no se proporciona, se toma una lista vacía
    return union(diferencia(a, b), diferencia(b, a), diferencia(c, d), diferencia(d, c))