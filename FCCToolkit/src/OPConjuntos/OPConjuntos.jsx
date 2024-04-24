import { useState } from 'react';
import { TextField, Card, CardContent, Chip, CardActionArea, Button, Select, MenuItem } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { postData } from '../Funciones/postData';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colores } from '../Enums/Colores';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box } from '@mui/material';
import NavPrincipal from './Componentes/Navbar';
import { getData } from '../Funciones/getData';

const MySwal = withReactContent(Swal);

function OPConjuntos() {
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState(''); // [
    const letters = ['A', 'B', 'C', 'D']; // Array of letters
    const opciones = {
        'Unión': 1,
        'Intersección': 2,
        'Diferencia': 3,
        'Diferencia simétrica': 4
    }; // Object mapping options to IDs
    const [batchCounter, setBatchCounter] = useState(0); // [0, function
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
        setFiles(Array.from(event.target.files));
    };
    const handleClearClick = () => {
        setFiles([]);
        setSelectedFiles([]);
        const fileInput = document.querySelector('input[type="file"]');
        fileInput.value = '';
        getData('/borrar_archivos')

    };
    const handleCardClick = (file) => {
        // Handle the card click event here
        if (selectedFiles.includes(file)) {
            setSelectedFiles(selectedFiles.filter(f => f !== file));
        } else {
            setSelectedFiles([...selectedFiles, file]);
        }
    };
    const handleButtonClick = () => {
        if (selectedFiles.length < 2) {
            // Show the SwalFire alert
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Selecciona al menos 2 archivos para realizar una operación',
            });
            return;
        }

        if (selectedFiles.length > 4) {
            // Reset the selected files
            setSelectedFiles([]);

            // Show the SwalFire alert
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo puedes cargar un máximo de 4 archivos por lote',
            });
            return;
        }

        // Crear un objeto FormData y agregar todos los archivos a este objeto
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            const newFile = new File([file], `${index + 1}_${file.name}`, { type: file.type });
            formData.append('files', newFile);
        });
        formData.append('message', opciones[selectedOption]);

        // Enviar el objeto FormData
        postData('/cargar_archivos', formData)
            .then(data => {
                console.log('aaa' + data);
                setResult(data.result.join(' ')); // Convierte el resultado en una cadena separada por espacios
                setBatchCounter(batchCounter + 1); // Incrementa el contador de lotes después de cargar los archivos
                setSelectedFiles([]); // Limpia los archivos seleccionados para el próximo lote
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 400) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hay un problema con los archivos.',
                    });
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hay un problema con los archivos.',
                    });
                }
            });
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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
                        <Typography variant="h5" style={{ fontFamily: 'Roboto' }}>
                            Selecciona máximo 4 archivos .txt para realizar operaciones sobre conjuntos :)
                        </Typography>
                    </Col>
                    <div className='pt-3'>
                        <Button className={"mx-3"} variant="contained" color="primary" onClick={handleClearClick}>
                            Limpiar conjuntos
                        </Button>
                        <input type="file" accept=".txt" multiple onChange={handleFileChange} />
                        <Typography className={"mt-2"}variant="h5" style={{ fontFamily: 'Arial' }}>
                            Escoge los conjuntos a operar
                        </Typography>
                        {files.length > 0 && (
                            <>
                                <Row className='pt-3'>
                                    {files.map((file, index) => (
                                        <Col key={index} xs={12 / files.length}>
                                            <Card onClick={() => handleCardClick(file)} style={{ backgroundColor: selectedFiles.includes(file) ? '#FFA7A4' : 'white', color: selectedFiles.includes(file) ? 'white' : 'black' }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Chip label={letters[index]} color="secondary" />
                                                        <Typography variant="h6">
                                                            {file.name}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                <Row className='pt-3'>
                                    <Col xs={6}>
                                        <Row>
                                            <Col>
                                                <Button variant="contained" color="secondary" onClick={handleButtonClick}>
                                                    Realizar operación
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={handleOptionChange}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    style={{ backgroundColor: 'white' }}
                                                >
                                                    <MenuItem value="" disabled>
                                                        Selecciona una opción
                                                    </MenuItem>
                                                    {Object.keys(opciones).map((opcion, index) => (
                                                        <MenuItem key={index} value={opcion}>{opcion}</MenuItem>
                                                    ))}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </div>
                </Col>
                <Box>
                    <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px' }}>
                        <Typography variant="h4" style={{ margin: '32px 0' }}>
                            Resultado:
                        </Typography>
                        <Typography variant="h6" style={{ backgroundColor: '#f5f5f5', padding: '32px', borderRadius: '4px' }}>
                            {result}
                        </Typography>
                    </Paper>
                </Box>
            </Box>

        </>
    );
}

export default OPConjuntos;