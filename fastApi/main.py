from typing import List, Union
from typing import Optional
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ttg import Truths
import tdv
import tdc
import shutil
import extras
import os
import sei

class Item(BaseModel):
    li: Optional[int] = None
    ls: Optional[int] = None
    f: Optional[str] = None

class ErrorModel(BaseModel):
    error: str
    mensaje: str


app = FastAPI()
# Verificar si la carpeta 'data' existe, si no, crearla
if not os.path.exists("data"):
    os.makedirs("data")

origins = [
'null'
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)



@app.get("/tabla_verdad/{e}", response_model=Union[list, ErrorModel])
async def TablaDeVerdad(e: str):
    try:
        variables = tdv.obtener_variables(e)
        expresiones = tdv.obtener_expresiones(e)
        truths = Truths(variables, expresiones, ints=False, ascending=False)
        df = truths.as_pandas

        # Convertir el DataFrame en un diccionario y devolverlo
        return df.to_dict("records")
    except Exception as ex:
        return JSONResponse(
            status_code=500, content={"error": "Error", "mensaje": str(ex)}
        )


@app.post("/items/{item_id}")
async def read_item(item_id: int, e: Union[str, None] = None):
    variables = tdv.obtener_variables(e)
    expresiones = tdv.obtener_expresiones(e)
    return variables, expresiones


@app.post("/conjuntos/{item_id}")
async def Conjuntos(
    item_id: int,
    a: Union[str, None],
    b: Union[str, None],
    c: Union[str, None] = None,
    d: Union[str, None] = None,
):
    a = a.split(" ") if a else []  # type: ignore
    b = b.split(" ") if b else []  # type: ignore
    c = c.split(" ") if c else []  # type: ignore
    d = d.split(" ") if d else []  # type: ignore
 
    if item_id == 1:
        print('Wiii',tdc.union(a, b, c, d))
        return tdc.union(a, b, c, d)
    elif item_id == 2:
        print('Wiii',tdc.interseccion(a, b, c, d))
        return tdc.interseccion(a, b, c, d)
    elif item_id == 3:
        print('Wiii',tdc.diferencia(a, b, c, d))
        return tdc.diferencia(a, b, c, d)
    elif item_id == 4:
        print('Wiii',tdc.difSimetrica(a, b, c, d))
        return tdc.difSimetrica(a, b, c, d)
    else:
        return "El ID no tiene ninguna opcion"

@app.post("/cargar_archivos")
async def CargarArchivos(files: List[UploadFile] = File(...), message: str = Form(...)):
    # Borra todos los archivos en el directorio 'data'
    shutil.rmtree('data')
    os.makedirs('data')

    filenames = []
    for file in files:
        file_path = f"data/{file.filename}"

        # Comprueba si el prefijo del archivo es uno de los números del 1 al 4
        prefix = file.filename.split("_")[0]  # type: ignore
        if prefix not in ["1", "2", "3", "4"]:
            raise HTTPException(
                status_code=400,
                detail="El nombre del archivo debe comenzar con uno de los números del 1 al 4",
            )

        # Guarda el archivo
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file.file.close()

        # Agrega el nombre del archivo a la lista
        filenames.append(file.filename)

        # Comprueba si el archivo tiene más de 10 líneas
        error_file = extras.ComprobadorDeArchivos(file_path)
        if error_file is not None:
            raise HTTPException(
                status_code=400,
                detail=f"El archivo {error_file} tiene más de 10 líneas",
            )
    print(message)
    datos = extras.leer_archivos()
    item_id = int(message)
    result = await Conjuntos(item_id, **datos)
    return {"filenames": filenames, "message": message, "result": result}

@app.get("/borrar_archivos")
async def BorrarArchivos():
    for filename in os.listdir("data"):
        os.remove(f"data/{filename}")
    return {"mensaje": "Archivos eliminados"}


    
@app.post("/sucesiones/{datos}")
def read_item( item: Item):
    return sei.sucesiones(item.li+1, item.ls, item.f)
    
    