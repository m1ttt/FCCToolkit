import { useState } from 'react';
import { TextField, Card, CardContent, Chip, CardActionArea, Button, Select, MenuItem } from '@mui/material';
import { Col } from 'react-bootstrap';
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

function Relaciones() {

    const [data, setData] = useState(["", "", "", [], [], ""]); // Inicializa data con valores por defecto

    const handleRelacionChange = (event) => {
        const encodedValue = encodeURIComponent(event.target.value);
        getData(`/relaciones?cad=${encodedValue}`, config)
            .then(response => {
                console.log(response);
                setData(response); // Actualiza data con la respuesta de la API
            });
    }
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
                                Relaciones y funciones
                            </Typography>
                            <Typography variant="h5" style={{ fontFamily: 'Roboto' }}>
                                Ingresa una relación y observa sus propiedades
                            </Typography>
                        </Col>
                        <div className='pt-3'>
                            <TextField
                                variant="outlined"
                                color="primary"
                                style={{ backgroundColor: 'white', color: 'black', fontSize: '1.5em' }}
                                label="Ingrese la relación"
                                onChange={handleRelacionChange}
                            />
                        </div>
                    </Col>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ backgroundColor: '#ff7f7f', color: 'white', fontSize: '1.4em' }}>
                                        <Typography variant="h5" fontWeight="bold">Propiedades</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6" fontWeight="bold">Reflexividad:</Typography> {data[0]}
                                        <Typography variant="h6" fontWeight="bold">Simetría:</Typography> {data[1]}
                                        <Typography variant="h6" fontWeight="bold">Transitividad:</Typography> {data[2]}
                                        <Typography variant="h6" fontWeight="bold">Función:</Typography> {data[5]}
                                        <Typography variant="h6" fontWeight="bold">Dominio:</Typography> {data[3].join(', ')}
                                        <Typography variant="h6" fontWeight="bold">Codominio:</Typography> {data[4].join(', ')}
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


export default Relaciones;