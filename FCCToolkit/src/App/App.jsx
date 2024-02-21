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


const MySwal = withReactContent(Swal);

function App() {
  const [text, setText] = useState('');
  const [data, setData] = useState(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };
  const handleClick = () => {
    const route = `/tabla_verdad/${encodeURIComponent(text)}`;
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
        MySwal.fire({
          title: '¡Error!',
          text: "Revisa la expresión que ingresaste.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  const handleClear = () => {
    setData(null);
  }


  return (
    <Box bgcolor={Colores.primary} style={{
      color: 'white',
    }} className="p-5">
      <Col style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px'
      }}>
        <Col className="d-flex justify-content-center">
          <Typography variant="h2" style={{ fontFamily: 'Lobster' }}>
            Tablas de verdad
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
            style: { color: 'white' }
          }}
          InputLabelProps={{
            style: { color: 'white' }
          }}
        />

        <Row className="d-flex" style={{ flexDirection: 'row' }}>
          <Button
            className='mt-5 mr-2'
            variant="contained"
            onClick={handleClick}
            style={{ backgroundColor: Colores.secondary }}
          >
            Generar tabla de verdad
          </Button>

          <Button
            className="mt-5 mb-5"
            variant="contained"
            style={{ backgroundColor: Colores.secondary }}
            onClick={handleClear}
          >
            Limpiar
          </Button>
        </Row>
        {data && (
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value !== null && value !== undefined ? value.toString() : ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Box>
  );
}

export default App;