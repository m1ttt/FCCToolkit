def sucesiones(inferior,superior,formula):
    limite =  superior - inferior
    sumatoria = 0
    multiplicacion = 1
    if limite != 0:
        k,suma,multiplicacion,serie = sucesiones(inferior+1,superior,formula)
        valor = float(eval(formula))
        serie.append(round(valor,3))
        return inferior-1, suma + valor, multiplicacion * valor, serie
    else:
        k = inferior
        valor = float(eval(formula))
        serie = [round(valor,3)]
        return inferior-1, valor, valor, serie