import { useState } from 'react';
import { TextField } from '@mui/material';
import { Col } from 'react-bootstrap';
import { getData } from '../Funciones/getData';
import { Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colores } from '../Enums/Colores';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box } from '@mui/material';
import NavPrincipal from './Componentes/Navbar';

const MySwal = withReactContent(Swal);

function OPConjuntos() {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        if (event.target.files.length > 4) {
            // Reset the file input value
            event.target.value = null;

            // Show the SwalFire alert
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo puedes seleccionar un máximo de 4 archivos',
            });
            return;
        }
        setFiles(event.target.files);
    };
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
                            Operaciones sobre conjuntos
                        </Typography>
                        <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
                            Selecciona 4 archivos .txt para realizar operaciones sobre conjuntos :)
                        </Typography>
                    </Col>
                    <div className='pt-3'>
                        <input type="file" accept=".txt" multiple onChange={handleFileChange} />
                        {files.length > 0 && (
                            <div>
                                <h2>Archivos seleccionados:</h2>
                                <ul>
                                    {Array.from(files).map((file, index) => (
                                        <li key={index}>{file.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Col>
            </Box>
        </>
    );
}

export default OPConjuntos;