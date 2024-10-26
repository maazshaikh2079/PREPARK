import Homepage from "./components/Homepage";
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import {UserAuthContextProviderSAP} from "./contexts/UserAuthContext-SAP.js"
import { UserAuthContextProviderPP } from "./contexts/UserAuthContext-PP.js";
import SAPSI from "./components/SAPSI.js";
import SAPSP from "./components/SAPSP.js";
import SAPDP from "./components/SAPDP.js";
import PPSP from "./components/PPSP.js";
import PPSI from "./components/PPSI.js";
import PPDP from "./components/PPDP.js";

function App() {
  return (
    <Container>
      <Row>
        <Col>
        <UserAuthContextProviderSAP>
        <UserAuthContextProviderPP>
         <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/sapsp' element={<SAPSP/>}/>
          <Route path='/sapsi' element={<SAPSI/>}/>
          <Route path='/sapdp' element={<SAPDP/>}/>
          <Route path='/ppsp' element={<PPSP/>}/>
          <Route path='/ppsi' element={<PPSI/>}/>
          <Route path='/ppdp' element={<PPDP/>}/>
         </Routes>
         </UserAuthContextProviderPP>
         </UserAuthContextProviderSAP>
        </Col>
      </Row>
    </Container>
  );
}

export default App;