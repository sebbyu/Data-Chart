import './../scss/App.scss';
// Component
import Navbar from './../../components/js/Navbar';
// Hooks
import {useState} from 'react';



export default function App() {

  const [page, setPage] = useState('USERS');

  const handleClick = currentPage => {
    setPage(currentPage);
    console.log(currentPage);
  };

  return (
    <div className="component-app">
      <div className="component-app navbar">
        <Navbar 
          currentPage={page}
          clickHandler={handleClick}/>
      </div>
    </div>
  )
}