
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import {DashBoard, Register, Landing, Error} from "./pages"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard></DashBoard>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="*" element={<Error></Error>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
