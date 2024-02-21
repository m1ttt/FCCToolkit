from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ttg import Truths
import tdv
from fastapi import HTTPException


class ErrorModel(BaseModel):
    error: str
    mensaje: str


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get("/tabla_verdad/{e}", response_model=Union[list, ErrorModel])
async def read_item(e: str):
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


@app.get("/prueba")
def funcion_de_prueba():
    return {"mensaje": "hola mundo"}
