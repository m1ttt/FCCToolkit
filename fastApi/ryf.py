import networkx as nx
import matplotlib.pyplot as plt
import re
import base64
import io

def crearGrafo(numX, numY):
    
    G = nx.DiGraph()
    
    nodos = set(numX + numY)
    for nodo in nodos:
        G.add_node(nodo)

    for i in range(len(numX)):
        G.add_edge(numX[i], numY[i])
    if(len(nodos) == 2):
        pos = nx.spring_layout(G, seed=42)
    else:
        pos = nx.circular_layout(G)
    nx.draw_networkx_nodes(G, pos)
    nx.draw_networkx_labels(G, pos)
    nx.draw_networkx_edges(G, pos, arrows=True)

    plt.show()
    



def crearGrafo64(numX, numY):
    G = nx.DiGraph()

    nodos = set(numX + numY)
    for nodo in nodos:
        G.add_node(nodo)

    for i in range(len(numX)):
        G.add_edge(numX[i], numY[i])
    if(len(nodos) == 2):
        pos = nx.spring_layout(G, seed=42)
    else:
        pos = nx.circular_layout(G)
    nx.draw_networkx_nodes(G, pos)
    nx.draw_networkx_labels(G, pos)
    nx.draw_networkx_edges(G, pos, arrows=True)

    # Guarda el gráfico en un objeto BytesIO
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)

    # Codifica el objeto BytesIO en base64 y decodifica a utf-8 para obtener una cadena
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')

    plt.close()

    return image_base64
    

def conseguirParametros(cadena):
    patron = r'\((\d+),(\d+)\)'

    resultados = re.findall(patron, cadena)

    numeros_x = []
    numeros_y = []

    for resultado in resultados:
        numeros_x.append(int(resultado[0]))
        numeros_y.append(int(resultado[1]))
    
    return numeros_x, numeros_y

def transitiva(numX,numY):
    num = 0
    alert = 0
    for i in range(len(numX)):
        for j in range(len(numX)):
            if numY[i] == numX[j] and i != j:
                num += 1
                for k in range(len(numX)):
                    if numX[i] == numX[k] and numY[j] == numY[k]:
                        alert += 1
    if num == alert:
        return "Si"
    else:
        return "No"

def reflexiva(numX,numY):
    alert = 0
    elementos = list(set(numX + numY))
    for elem in elementos:
        for i in range(len(numX)):
            if elem == numX[i] and elem == numY[i]:
                alert += 1
    
    if alert == len(elementos) and len(numX) != 0:
        return "Si"
    else:
        return "No"
    
def simetrica(numX,numY):
    alert = 0
    for i in range(len(numX)):
        for j in range(len(numX)):
            if numY[i] == numX[j] and numX[i] == numY[j]:
                alert += 1
    if alert == len(numX):
        return "Si"
    else:
        return "No"

def isFuncion(numX):
    for i in range(len(numX)):
        for j in range(i+1,len(numX)):
            if numX[i] == numX[j]:
               return "No"
    return "Si"