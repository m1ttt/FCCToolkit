import ttg
import tdv

while True:
    print("\nCAJA DE HERRAMIENTAS DE FCC\n")
    print("1.FCC ToolKit")
    print("2.Salir\n")

    op = input("Ingrese una opcion: ")
    if op == "1":
        while True:
            print("\nFFC ToolKit")
            expresion = input("Ingrese una expresion: ")
            variables = tdv.obtener_variables(expresion)
            expresiones = tdv.obtener_expresiones(expresion)
            try:
                print(ttg.Truths(variables, expresiones, ints=False, ascending=False))
            except:
                print("\nError en la expresion\n")
            op = input("¿Desea ingresar otra expresion (s/n)? ")
            if op.lower() == "n":
                break

    else:
        print("\nVuelva pronto")
        break
