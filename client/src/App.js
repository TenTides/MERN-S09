import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/navbar";
import Images from './pages/Images';
import SignInSignUpForm from './pages/Login';
import Verify from './pages/Verify';


function App() {
  return (
      <BrowserRouter>
			<Routes>
				<Route path="/login" element={<SignInSignUpForm/>}></Route>
				<Route path="/verify" element={<Verify/>}></Route>
				<Route path="/images" element={<Images />}></Route>
				<Route path="/" element={<Home/>}>
			</Route>
			</Routes>
      </BrowserRouter>
  );
}

export default App;
