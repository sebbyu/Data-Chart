import './../scss/App.scss';
// components
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
import AddForm from './../../components/js/AddForm';
// hooks
import {useState} from 'react';
// assets
import jsonData from '../../assets/dummy_data.json';
import {getFullName} from './../../helpers/helperFunc';


export default function App() {

  const [page, setPage] = useState('USERS');
  const [data, setData] = useState(jsonData);
  const [userMap, setUserMap] = useState(() => {
    var map = new Map();
    data.forEach(x => {
      map.set(getFullName(x), 1);
    })
    return map;
  });

  const switchTab = currentPage => {
    setPage(currentPage);
  };

  const handleAddNewData = newDatum => {
    let pass = false;
    newDatum.id = data.length+1;
    newDatum['first name'] = newDatum['first name'].trim();
    newDatum['last name'] = newDatum['last name'].trim();
    let newData = [...data, newDatum];
    if (page === "USERS") {
      if (!userMap.has(getFullName(newDatum))) {
        userMap.set(getFullName(newDatum), 1);
        setUserMap(userMap);
        pass = true;
      }
    }
    if (page === "EXPENSE") {
      pass = true;
    }
    if (pass) {
      setData(newData);
    }
  }

  const handleUpdateData = (name, elem) => {
    var newData;
    if (name === "DELETE") {
      if (page === "USERS") {
        newData = data.filter(x => getFullName(x) !== elem);
      } 
      if (page === "EXPENSE") {
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