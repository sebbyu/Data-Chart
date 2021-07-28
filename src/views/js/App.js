import './../scss/App.scss';
// Component
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
import AddForm from './../../components/js/AddForm';
// Hooks
import {useState} from 'react';



export default function App() {

  const [page, setPage] = useState('USERS');

  const switchTab = currentPage => {
    setPage(currentPage);
    console.log(currentPage);
  };

  return (
    <div className="component-app">
      <div className="component-app navbar">
        <Navbar 
          currentPage={page}
          clickHandler={switchTab}/>
      </div>
      <div className="component-app table">
        <Table 
          currentPage={page}/>
      </div>
      <div className="component-app add_form">
        <AddForm />
      </div>
    </div>
  )
}