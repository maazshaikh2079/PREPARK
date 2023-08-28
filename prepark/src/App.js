import Homepage from "./components/Homepage";
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import {UserAuthContextProvider} from "./context/UserAuthContext.js"
import SAPSI from "./components/SAPSI.js";
import SAPSP from "./components/SAPSP.js";
import PPSP from "./components/PPSP.js";
import PPSI from "./components/PPSI.js";
function App() {
  return (
    <Container>
      <Row>
        <Col>
        <UserAuthContextProvider>
         <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/sapsi' element={<SAPSI/>}/>
          <Route path='/sapsp' element={<SAPSP/>}/>
          <Route path='/ppsp' element={<PPSP/>}/>
          <Route path='/ppsi' element={<PPSI/>}/>
         </Routes>
         </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;