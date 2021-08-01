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
  const [newDatum, setNewDatum] = useState(null);
  const [userMap, setUserMap] = useState(() => {
    var map = new Map();
    data.forEach(x => {
      map.set(getFullName(x), 
      map.has(getFullName(x)) ? map.get(getFullName(x)) + parseInt(x['expense']['cost']) : 
      parseInt(x['expense']['cost']));
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

  const handleUpdateData = (name, elem, datum) => {
    let newData;
    if (name === "DELETE") {
      if (page === "USERS") {
        newData = data.filter(x => getFullName(x) !== elem);
      } 
      if (page === "EXPENSE") {
        newData = data.filter(x => x.id !== elem);
      }
      setData(newData);
    }
    if (name === "EDIT") {
      console.log(name, elem);
    }
    if (name === "EDITED") {
      // let newDatum = JSON.parse(JSON.stringify(datum));
      let cost = userMap.get(elem);
      newDatum['expense']['cost'] = cost;
      setNewDatum(newDatum);
      if (page === "USERS") {
        newData = data.filter(x => getFullName(x) !== elem);
        newData = [...newData, newDatum];
        userMap.set(getFullName(newDatum), cost);
        userMap.delete(elem);
        setUserMap(userMap);
      } 
      setData(newData);
    }
  }

  const test = newDatum => {
    setNewDatum(newDatum);
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
          clickHandler={handleUpdateData}
          test={test}/>
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