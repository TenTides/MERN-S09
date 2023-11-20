import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
// import Navbar from "./components/navbar";
import Images from './pages/Images';
import Account from './pages/Account';

function App() {
  return (
      <BrowserRouter>
			<Routes>
				<Route path="/account" element={<Account/>}></Route>
				<Route path="/images" element={<Images />} />
				<Route path="/" element={<Home/>}>
			</Route>
			</Routes>
      </BrowserRouter>
  );
}

export default App;
