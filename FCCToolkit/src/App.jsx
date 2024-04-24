import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Inicio from './Inicio/Inicio'
import OPConjuntos from './OPConjuntos/OPConjuntos'

import Sucesiones from './Sucesiones/Sucesiones'

function App() {
    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/tdvgen" element={<Inicio />} />
                    <Route path="/opscon" element={<OPConjuntos/>} />
                    <Route path="/sucesiones" element={< Sucesiones/>} />
                    <Route path="/" element={<Navigate to="/tdvgen" />} />
                </Routes>
            </Router>
        </React.StrictMode> 
    )
}

export default App;