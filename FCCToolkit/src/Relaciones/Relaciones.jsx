import React, { useState } from "react";
import { TextField, Card, CardContent, Chip, CardActionArea, Button, Select, MenuItem } from '@mui/material';
import { Col } from 'react-bootstrap';
import { Typography, Grid } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colores } from '../Enums/Colores';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box } from '@mui/material';
import NavPrincipal from './Componentes/Navbar';
import { getData } from '../Funciones/getData';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const config = {};

const MySwal = withReactContent(Swal);

function Relaciones() {
    const [data, setData] = useState({
        reflexiva: "",
        simetrica: "",
        transitiva: "",
        dominio: [],
        codominio: [],
        isFuncion: "",
        graph: ""
    }); // Inicializa data con valores por defecto

    const handleRelacionChange = (event) => {
        const encodedValue = encodeURIComponent(event.target.value);
        getData(`/relaciones?cad=${encodedValue}`, config)
            .then(response => {
                console.log(response);
                setData(response); // Actualiza data con la respuesta de la API
            });
    }
    const { reflexiva, simetrica, transitiva, dominio, codominio, isFuncion, graph } = data;

    return (
        <>
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
                            style={{ backgroundColor: 'white', color: 'black', fontSize: '1.5em', width: '100%' }}
                            label="Ingrese la relación"
                            onChange={handleRelacionChange}
                            size="medium"
                        />
                    </div>
                </Col>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ backgroundColor: '#ff7f7f', color: 'white', fontSize: '1.4em', width: '50%' }}>
                                    <Typography variant="h5" fontWeight="bold">Propiedades</Typography>
                                </TableCell>
                                <TableCell style={{ backgroundColor: '#ff7f7f', color: 'white', fontSize: '1.4em', width: '50%' }}>
                                    <Typography variant="h5" fontWeight="bold">Gráfico</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Reflexividad:</Typography> <span style={{ fontSize: '1.8em' }}>{reflexiva}</span>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Simetría:</Typography> <span style={{ fontSize: '1.8em' }}>{simetrica}</span>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Transitividad:</Typography> <span style={{ fontSize: '1.8em' }}>{transitiva}</span>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Función:</Typography> <span style={{ fontSize: '1.8em' }}>{isFuncion}</span>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Dominio:</Typography> <span style={{ fontSize: '1.8em' }}>{dominio.join(', ')}</span>
                                    <Typography variant="h5" fontWeight="bold" style={{ fontSize: '2em' }}>Codominio:</Typography> <span style={{ fontSize: '1.8em' }}>{codominio.join(', ')}</span>
                                </TableCell>
                                <TableCell>
                                    <img src={`data:image/png;base64,${graph}`} alt="Graph" />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default Relaciones;