import logo from './logo.svg';
import './App.css';
import BddGen from './bdd-gen/bdd-gen';
import Navbar from './bdd-gen/Navbar';

function App() {
  return (
    <div className="container p-5 my-5">
    <Navbar />
    <BddGen />
  </div>
  );
}

export default App;
