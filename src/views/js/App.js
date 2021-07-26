import './../scss/App.scss';
// Component
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
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
      <div className="component-app table">
        <Table 
          currentPage={page}/>
      </div>
    </div>
  )
}