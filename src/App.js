import { Route, Routes} from 'react-router-dom';
import './App.css';
import CreateTask from './components/CreateTask';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      
       <NavBar />
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='create-tasks' element={<CreateTask />} />
          <Route path='*' element={ <div><h2>No Page Found</h2></div> } />
       </Routes>
    </div>
  );
}

export default App;
