import { useState } from 'react';
import { TextField, Card, CardContent, Chip, CardActionArea, Button, Select, MenuItem } from '@mui/material';
import { Col } from 'react-bootstrap';
import { postDataSucesiones } from '../Funciones/postData';
import { Typography, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colores } from '../Enums/Colores';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box } from '@mui/material';
import NavPrincipal from './Componentes/Navbar';
import { MathJaxProvider, MathJaxFormula } from 'mathjax3-react';
import { getData } from '../Funciones/getData';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const config = {};


const MySwal = withReactContent(Swal);

function Sucesiones() {
    const [limiteInferior, setLimiteInferior] = useState("");
    const [limiteSuperior, setLimiteSuperior] = useState("");
    const [results, setResults] = useState({ inferior: null, suma: null, multiplicacion: null, serie: [] });
    const [formula, setFormula] = useState("");


    const isValidFormula = (formula) => {
        // Verifica si la fórmula contiene un '_' o '^' seguido por un espacio o el final de la cadena
        const invalidSubOrSuperScript = /[_^](\s|$)/;
        return !invalidSubOrSuperScript.test(formula);
    };

    const latexToPython = (latexFormula) => {
        return latexFormula
            .replace('^', '**') // Reemplaza '^' (exponente en LaTeX) con '**' (exponente en Python)
            .replace('\\frac', '/') // Reemplaza '\frac' (fracción en LaTeX) con '/' (división en Python)
            .replace('{', '') // Elimina '{'
            .replace('}', ''); // Elimina '}'
    };

    const handleFormulaChange = (event) => {
        handleInputChange(event.target.value, limiteInferior, limiteSuperior);
    };

    const handleLimiteInferiorChange = (event) => {
        handleInputChange(formula, event.target.value, limiteSuperior);
    };

    const handleLimiteSuperiorChange = (event) => {
        handleInputChange(formula, limiteInferior, event.target.value);
    };

    const handleInputChange = (newFormula, newLimiteInferior, newLimiteSuperior) => {
        setFormula(newFormula);
        setLimiteInferior(newLimiteInferior);
        setLimiteSuperior(newLimiteSuperior);
    };
    const handleButtonClick = () => {
        let errorMessage = '';
        const limiteInferiorNumber = Number(limiteInferior);
        const limiteSuperiorNumber = Number(limiteSuperior);

        if (formula.trim() === '') {
            errorMessage += 'Falta la fórmula. ';
        }
        if (limiteInferior.trim() === '') {
            errorMessage += 'Falta el límite inferior. ';
        }
        if (limiteSuperior.trim() === '') {
            errorMessage += 'Falta el límite superior. ';
        }
        if (limiteInferiorNumber >= limiteSuperiorNumber) {
            errorMessage += 'El límite superior debe ser mayor que el límite inferior. ';
        }

        // Si todos los campos están vacíos, establece un mensaje de error genérico
        if (formula.trim() === '' && limiteInferior.trim() === '' && limiteSuperior.trim() === '') {
            errorMessage = 'Todos los campos son obligatorios. ';
        }





        if (errorMessage !== '') {
            MySwal.fire({
                title: '¡Error!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const pythonFormula = latexToPython(formula);
        const route = `/sucesiones?li=${limiteInferior}&ls=${limiteSuperior}&f=${encodeURIComponent(pythonFormula)}`;
        getData(route)
            .then(result => {
                console.log(result);
                setResults({
                    inferior: result[0],
                    suma: result[1],
                    multiplicacion: result[2],
                    serie: result[3]
                });
            })
            .catch(error => {
                console.log(error);
                console.error('There was a problem with the fetch operation:', error);
                let errorMessage = error.mensaje;
                if (error.status === 404) {
                    errorMessage = "No puedes mandar campos vacíos";
                }
                MySwal.fire({
                    title: '¡Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };
    return (
        <>
            <MathJaxProvider>
                <NavPrincipal />
                <Box bgcolor={Colores.primary} style={{
                    color: 'white',
                    height: '100vh',
                }} className="p-5">

                    <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px'
                    }}>
                        <Col className="d-flex justify-content-center flex-column">
                            <Typography variant="h2" style={{ fontFamily: 'Lobster' }}>
                                Sucesiones númericas
                            </Typography>
                            <Typography variant="h5" style={{ fontFamily: 'Roboto' }}>
                                Ingresa el limite inferior, el limite superior y la fórmula de la sucesión.
                            </Typography>
                        </Col>
                        <div className='pt-3'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box mr={2}>
                                    <TextField
                                        label="Límite inferior"
                                        value={limiteInferior}
                                        onChange={handleLimiteInferiorChange} // Aquí
                                        InputProps={{
                                            style: {
                                                backgroundColor: 'white',
                                                color: 'black'
                                            }
                                        }}
                                    />

                                </Box>
                                <Box mr={2}>
                                    <TextField
                                        label="Límite superior"
                                        value={limiteSuperior}
                                        onChange={handleLimiteSuperiorChange} // Y aquí
                                        InputProps={{
                                            style: {
                                                backgroundColor: 'white',
                                                color: 'black'
                                            }
                                        }}
                                    />
                                </Box>
                            </div>
                            <Box mt={2}>

                                <TextField
                                    label="Fórmula"
                                    value={formula}
                                    onChange={handleFormulaChange}
                                    InputProps={{
                                        style: {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }
                                    }}
                                    fullWidth
                                />
                                {isValidFormula(formula) && (
                                    <MathJaxFormula formula={`$$\\Huge{${formula.replace(/int/g, '\\int').replace(/ /g, '\\;')}}$$`} />
                                )}

                                <Button variant="contained" color="primary" onClick={handleButtonClick}>
                                    Calcular
                                </Button>
                            </Box>
                        </div>
                    </Col>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight="bold">Serie</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Grid container spacing={1}>
                                            {results.serie.map((result, index) => (
                                                <Grid key={index} item>
                                                    {result}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight="bold">Inferior:</Typography> {results.inferior}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight="bold">Suma:</Typography> {results.suma}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle1" fontWeight="bold">Multiplicación:</Typography> {results.multiplicacion}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </MathJaxProvider>
        </>
    );
}

export default Sucesiones;