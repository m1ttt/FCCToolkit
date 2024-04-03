import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button, Col, Table, Row } from 'react-bootstrap';
import { getData } from '../Funciones/getData';
import { Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colores } from '../Enums/Colores';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box } from '@mui/material';
import NavPrincipal from './Componentes/Navbar';


const MySwal = withReactContent(Swal);

function Inicio() {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState(null);

  const handleInputChange = (event) => {
    setText(event.target.value);

    // Si el temporizador ya está corriendo, lo cancelamos
    if (timer) {
      clearTimeout(timer);
    }

    // Si el campo de texto está vacío, no hacemos nada
    if (event.target.value.trim() === '') {
      setData(null);
      return;
    }

    // Iniciamos un nuevo temporizador que se activará después de 5 segundos
    setTimer(setTimeout(() => {
      const route = `/tabla_verdad/${encodeURIComponent(event.target.value)}`;
      getData(route)
        .then(result => {
          setData(result);
        })
        .catch(error => {
          console.log(error);
          console.error('There was a problem with the fetch operation:', error);
          let errorMessage = error.mensaje;
          if (error.status === 404) {
            errorMessage = "No puedes mandar campos vacíos";
          }
          // MySwal.fire({
          //   title: '¡Error!',
          //   text: "Revisa la expresión que ingresaste.",
          //   icon: 'error',
          //   confirmButtonText: 'OK'
          // });
        });
    }, 0)); // 5000 milisegundos son 5 segundos
  };


  const handleClear = () => {
    setData(null);
    setText('');
  }


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
              Tablas de verdad
            </Typography>
            <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
              Aquí puedes generar tablas de verdad a partir de expresiones de lógica proposicional, simplemente ingresa las variables correspondientes :)
            </Typography>
          </Col>
          <TextField
            className='mt-5'
            label="Oración de lógica proposicional"
            value={text}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
            InputProps={{
              style: { color: 'white', fontSize: '20px' } // Aumenta el tamaño de la fuente aquí
            }}
            InputLabelProps={{
              style: { color: 'white', fontSize: '20px' } // Aumenta el tamaño de la fuente aquí
            }} />
          <div className='pt-5'>
            <Button variant="danger" onClick={handleClear}>LIMPIAR TODA LA PANTALLA</Button>
          </div>
          {data && (
            <Table striped bordered hover className='mt-5'>
              <thead>
                <tr style={{
                  fontSize: '25px',
                }}>
                  {Object.keys(data[0]).map((key, index) => {
                    let newKey = key.replace(/and/gi, '∧').replace(/or/gi, '∨').replace(/=>/gi, '→').replace(/not/gi, '¬');
                    return <th key={index}>{newKey}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i, arr) => {
                      let displayValue = '';
                      if (value !== null && value !== undefined) {
                        if (typeof value === 'boolean') {
                          displayValue = value ? 'T' : 'F';
                        } else {
                          displayValue = value.toString();
                        }
                      }
                      return (
                        <td key={i} style={i === arr.length - 1 ? { fontSize: '22px' } : {}}>
                          {displayValue}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <div className='pt-5'>
            <Typography variant="body1" style={{ fontFamily: 'Roboto' }}>
              El ancho de banda no crece en los árboles :(
            </Typography>
          </div>
        </Col>
      </Box>
      </>
  );
}

export default Inicio;