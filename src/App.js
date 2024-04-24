import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CameraScreen from './components/CameraScreen';
import Gallery from './components/Gallery'
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
						<Route
							path="/Camera"
							element={<CameraScreen />}
						/>
						<Route
							path="/Gallery"
							element={<Gallery />}
						/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
