import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './pages/Weather';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path="/weather" element={<Weather/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
