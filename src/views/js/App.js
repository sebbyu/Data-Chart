import './../scss/App.scss';
// Component
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
import AddForm from './../../components/js/AddForm';
// Hooks
import {useState} from 'react';
// assets
import jsonData from '../../assets/dummy_data.json';


export default function App() {

  const [page, setPage] = useState('USERS');
  const [data, setData] = useState(jsonData);

  const switchTab = currentPage => {
    setPage(currentPage);
  };

  const handleAddNewData = newDatum => {
    let newData = [...data, newDatum];
    setData(newData);
  }

  return (
    <div className="component-app">
      <div className="component-app navbar">
        <Navbar 
          clickHandler={switchTab}/>
      </div>
      <div className="component-app table">
        <Table 
          currentPage={page}
          currentData={data}/>
      </div>
      <div className="component-app add_form">
        <AddForm 
          currentPage={page}
          addNewData={handleAddNewData}/>
      </div>
    </div>
  )
}