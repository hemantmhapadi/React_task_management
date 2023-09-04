import React, { useState ,useEffect} from 'react';
import { Navigate, useNavigate ,useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Modal, Box, Typography, Button } from '@mui/material';
import CreateTask from './CreateTask';


function NavBar () {
  const [open, setOpen] = useState(false); // State variable to control the visibility of the modal
  const navigate = useNavigate(); // React Router hook for programmatic navigation
  const location = useLocation();
  const [recivedValue,setReceivedValue]=useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksTitle, setTasksTitle] = useState('');
 // const [title,setTitle] = useState();
  // const handleReceivedFlag = (flag) =>{
  //   setReceivedValue(flag);
  //   //console.log(flag);
  // }

  useEffect(() => {

    if (location.state) {

      const newTask = {

        title:location.state.title,

        description: location.state.description,

        priority: location.state.priority,

       

        completed: false,

      };  
      setTasks([...tasks, newTask]);
      setTasksTitle(newTask.title);
      console.log(newTask.title);
     }

    

  },[location.state] );

  
  // Function to check if the current route is the home page ("/")
  const isEmpty = (e) => {

   //e.preventDefault();   
      //handleReceivedFlag();
      
      //console.log(tasksTitle); // Log the title after a delay
    if (window.location.pathname === '/') {
      window.location.href = '/';
      
      //console.log(recivedValue);
      console.log(tasksTitle); 
     
    } else {
     
      isEmpty2();
    
     
    }
  };
  const isEmpty2 = (e) =>{
    if(tasksTitle.length){
      window.location.href = '/';
    }else{
      handleOpen(true);
      
    }
};
  // useEffect(() => {
  //   // Check if title or description is empty
  //   console.log(flag);
  // }, [flag]);
  
  


  // Function to open the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
    //console.log("Hello World");
  };

  // Function to handle the "Yes" button click in the modal
  const handleYes = () => {
    navigate('/');
    handleClose();
  };

  // Function to handle the "No" button click in the modal
  const handleNo = (event) => {
    event.preventDefault(); // Prevents the default navigation behavior
    setOpen(false);
  };

  // Function to define the styles for the navigation links
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'none' : 'normal',
    };
  };

  return (
    
   
    <nav className='primary-nav'>
      {/* Navigation link for the home page */}
      <NavLink style={navLinkStyles} onClick={isEmpty}>
        Home
        
      </NavLink>

      {/* Modal component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ p: 2, bgcolor: 'background.paper', maxWidth: 300, margin: 'auto' }}>
          <Typography variant='h6' component='h2'>
            Do you want to leave the page? The data will be lost.
          </Typography>

          {/* "Yes" button in the modal */}
          <Button variant='contained' onClick={handleYes} sx={{ mr: 2 }}>
            Yes
          </Button>

          {/* "No" button in the modal */}
          <Button variant='contained' onClick={handleNo} sx={{ mr: 2 }}>
            No
          </Button>
        </Box>
      </Modal>

      {/* Navigation link for creating tasks */}
      <NavLink style={navLinkStyles} to='/create-tasks'>
        Create Task
      </NavLink>
    </nav>
  );
};
export default NavBar;