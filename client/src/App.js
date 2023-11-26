import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/navbar";
import Images from './pages/Images';
import Account from './pages/Account';
import Verify from './pages/Verify';


function App() {
  return (
      <BrowserRouter>
			<Routes>
				<Route path="/account" element={<Account/>}></Route>
				<Route path="/verify" element={<Verify/>}></Route>
				<Route path="/images" element={<Images />} />
				<Route path="/" element={<Home/>}>
			</Route>
			</Routes>
      </BrowserRouter>
  );
}

export default App;
