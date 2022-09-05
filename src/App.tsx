//Components
import Navbar from './components/Navbar/Navbar';
import Body from './components/Body/Body';

//Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="full-height full-width">
      <div className="navbar">
        <Navbar/>
      </div>
      <div className="body">
        <Body/>
      </div>
    </div>
  );
}

export default App;
