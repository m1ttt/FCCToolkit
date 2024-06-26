import ttg
import tdv
import tdc
import sei
import ryf

def leer_conjunto(nom_archivo):
    with open(nom_archivo,'r') as archivo:
        lineas = archivo.readlines()
        return sorted(list({linea.strip() for linea in lineas}))
    
def toolkitSucesiones():
    inferior = float(input("\nIngrese el limite inferior: "))
    superior = float(input("Ingrese el limite superior: "))
    formula = input("Ingrese la formula: ")
    res = sei.sucesiones(inferior+1,superior,formula)
    print("Termino k(n): ",res[3][0], sep="")
    for i in range(1,len(res[3])):
        print("Termino k(n-",i,"): ",res[3][i], sep="")
    print("Suma =",res[1])
    print("Multiplicacion =",res[2])
    
def relaciones():
    cadena = input("Ingrese el conjunto de parejas ordenadas:")
    array = ryf.conseguirParametros(cadena)
    print("Reflexiva:",ryf.reflexiva(array[0],array[1]))
    print("Simetrica:",ryf.simetrica(array[0],array[1]))
    print("Transitiva:",ryf.transitiva(array[0],array[1]))
    print("Dominio:",set(array[0]))
    print("Codominio:",set(array[1]))
    print("Es funcion:",ryf.isFuncion(array[0]))
    op = input("Desea ver el grafo dirigido de la relacion (S/N):")
    if op.upper() == 'S' :
        ryf.crearGrafo(array[0],array[1])

while True:
    print("\nCAJA DE HERRAMIENTAS DE FCC\n")
    print("1.FCC ToolKit")
    print("2.Teoria de conjuntos")
    print("3.Sucesiones")
    print("4.Relaciones y funciones")
    print("5.Salir\n")

    op = input("Ingrese una opcion: ")
    if op == "1":
        while True:
            print("\nFFC ToolKit")
            expresion = input("Ingrese una expresion: ")
            variables = tdv.obtener_variables(expresion)
            expresiones = tdv.obtener_expresiones(expresion)
            try:
                print(ttg.Truths(variables,expresiones,ints=False,ascending=True))
            except:
                print("\nError en la expresion\n")
            op = input("¿Desea ingresar otra expresion (s/n)? ")
            if op.lower() == "n":
                break
    elif op == "2":
        while True:
            print("\nTeoria de conjuntos\n")
            A = leer_conjunto("archivos_TDC\Conjunto_A.txt")
            B = leer_conjunto("archivos_TDC\Conjunto_B.txt")
            C = leer_conjunto("archivos_TDC\Conjunto_C.txt")
            U = leer_conjunto("archivos_TDC\Conjunto_U.txt")
            print("A = ",A)
            print("B = ",B)
            print("C = ",C)
            print("U = ",U)
            print("\nOPERACIONES")
            print("\n1.Union")
            print("2.Interseccion")
            print("3.Diferencia")
            print("4.Diferencia simetrica")
            print("5.Volver al menu principal")
            
            op = input("\nIngrese una opcion: ")
            if op == "1":
                print("\n1.A ∪ B")
                print("2.A ∪ C")
                print("3.B ∪ C")
                print("4.A ∪ (B ∪ C)")
                subco = input("\nElija una operacion: ")
                print()
                if subco == "1":
                    res = tdc.union(A,B)
                    print("A ∪ B = ",A,"∪",B,"=",res)
                elif subco == "2":
                    res = tdc.union(A,C)
                    print("A ∪ C = ",A,"∪",C,"=",res)
                elif subco == "3":
                    res = tdc.union(B,C)
                    print("B ∪ C = ",B,"∪",C,"=",res)
                elif subco == "4":
                    res = tdc.union(A,B,C)
                    print("A ∪ (B ∪ C) = ",A,"∪(",B,"∪",C,") =",res)
            elif op == "2":
                print("\n1.A ∩ B")
                print("2.A ∩ C")
                print("3.B ∩ C")
                print("4.A ∩ (B ∩ C)")
                subco = input("\nElija una operacion: ")
                print()
                if subco == "1":
                    res = tdc.interseccion(A,B)
                    print("A ∩ B = ",A,"∩",B,"=",res)
                elif subco == "2":
                    res = tdc.interseccion(A,C)
                    print("A ∩ C = ",A,"∩",C,"=",res)
                elif subco == "3":
                    res = tdc.interseccion(B,C)
                    print("B ∩ C = ",B,"∩",C,"=",res)
                elif subco == "4":
                    res = tdc.interseccion(A,B,C)
                    print("A ∩ (B ∩ C) = ",A,"∩(",B,"∩",C,") =",res)
            elif op == "3":
                print("\n1.A - B")
                print("2.A - C")
                print("3.B - C")
                subco = input("\nElija una operacion: ")
                print()
                if subco == "1":
                    res = tdc.diferencia(A,B)
                    print("A - B = ",A,"-",B,"=",res)
                elif subco == "2":
                    res = tdc.diferencia(A,C)
                    print("A - C = ",A,"-",C,"=",res)
                elif subco == "3":
                    res = tdc.diferencia(B,C)
                    print("B - C = ",B,"-",C,"=",res)
            elif op == "4":
                print("\n1.A ∆ B")
                print("2.A ∆ C")
                print("3.B ∆ C")
                subco = input("\nElija una operacion: ")
                if subco == "1":
                    res = tdc.difSimetrica(A,B)
                    print("A ∆ B = ",A,"∆",B,"=",res)
                elif subco == "2":
                    res = tdc.difSimetrica(A,C)
                    print("A ∆ C = ",A,"∆",C,"=",res)
                elif subco == "3":
                    res = tdc.difSimetrica(B,C)
                    print("B ∆ C = ",B,"∆",C,"=",res)
            else:
                break
    elif op == "3":
        toolkitSucesiones()
    elif op == "4":
        relaciones()
    else:
        print("\nVuelva pronto")
        break
