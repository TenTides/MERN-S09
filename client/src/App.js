import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/navbar";
import Images from './pages/Images';
import {Login, Register} from './pages/Login';
import {SignInSignUpForm} from './pages/account.js';

import Verify from './pages/Verify';


function App() {
  return (
      <BrowserRouter>
			<Routes>
				<Route path="/register" element={<Register/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/signinsignup" element={<SignInSignUpForm/>}></Route>
				<Route path="/verify" element={<Verify/>}></Route>
				<Route path="/images" element={<Images />} />
				<Route path="/" element={<Home/>}>
			</Route>
			</Routes>
      </BrowserRouter>
  );
}

export default App;
