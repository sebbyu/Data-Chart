import './../scss/App.scss';
// Component
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
import AddForm from './../../components/js/AddForm';
// Hooks
import {useState} from 'react';
// assets
import jsonData from '../../assets/dummy_data.json';
import {getFullName} from './../../helpers/helperFunc';


export default function App() {

  const [page, setPage] = useState('USERS');
  const [data, setData] = useState(jsonData);

  const switchTab = currentPage => {
    setPage(currentPage);
  };

  const handleAddNewData = newDatum => {
    newDatum.id = data.length+1;
    newDatum['first name'] = newDatum['first name'].trim();
    newDatum['last name'] = newDatum['last name'].trim();
    let newData = [...data, newDatum];
    setData(newData);
  }

  const handleUpdateData = (name, elem) => {
    var newData;
    if (name === "DELETE") {
      if (page === "USERS") {
        newData = data.filter(x => getFullName(x) !== elem);
      } else {
        newData = data.filter(x => x.id !== elem);
      }
      setData(newData);
    }
    console.log(name, elem);
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
          currentData={data}
          clickHandler={handleUpdateData}/>
      </div>
      <div className="component-app add_form">
        <AddForm 
          currentPage={page}
          addNewData={handleAddNewData}
          currentData={data}/>
      </div>
    </div>
  )
}