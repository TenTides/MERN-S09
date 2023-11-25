import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/navbar";
import Images from './pages/Images';
import Register from './pages/Register';
import Login from './pages/Login';
import Verify from './pages/Verify';


function App() {
  return (
      <BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/images" element={<Images />} />
				<Route path="/" element={<Home/>}></Route>
				<Route path="/verify/:token" element={<Verify/>}>
			</Route>
			</Routes>
      </BrowserRouter>
  );
}

export default App;
