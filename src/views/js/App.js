import './../scss/App.scss';
// components
import Navbar from './../../components/js/Navbar';
import Table from './../../components/js/Table';
import AddForm from './../../components/js/AddForm';
// hooks
import {useState, useEffect} from 'react';
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
      let newVal;
      if (map.has(getFullName(x))) {
        newVal = map.get(getFullName(x));
        newVal[0] += parseInt(x['expense']['cost']);
        newVal[1] += 1;
      } else {
        newVal = [];
        newVal.push(parseInt(x['expense']['cost']));
        newVal.push(1);
      }
      map.set(getFullName(x), newVal);
    })
    return map;
  });

  useEffect(() => {
    // console.log(data);
    // console.log(newDatum);
    console.log(userMap);
  }, [data, newDatum, userMap]);

  const switchTab = currentPage => {
    setPage(currentPage);
  };

  const handleUpdatedDatum = newDatum => {
    setNewDatum(newDatum);
  }

  const handleAddNewData = newDatum => {
    let pass = false;
    newDatum.id = data.length+1;
    newDatum['first name'] = newDatum['first name'].trim();
    newDatum['last name'] = newDatum['last name'].trim();
    let newData = [...data, newDatum];
    if (page === "USERS") {
      if (!userMap.has(getFullName(newDatum))) {
        userMap.set(getFullName(newDatum), [0, 1]);
        setUserMap(userMap);
        pass = true;
      }
    }
    if (page === "EXPENSE") {
      let newVal = userMap.get(getFullName(newDatum));
      newVal[0] += parseInt(newDatum['expense']['cost']);
      newVal[1] += 1;
      userMap.set(getFullName(newDatum), newVal);
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
      if (page === "USERS") {
        let allOldData = data.filter(x => getFullName(x) === elem);
        allOldData.forEach((x,i) => {
          x['first name'] = newDatum['first name'];
          x['last name'] = newDatum['last name'];
        })
        let cost = userMap.get(elem)[0];
        console.log(cost);
        newDatum['expense']['cost'] = cost;
        setNewDatum(newDatum);
        newData = data.filter(x => getFullName(x) !== elem);
        let newVal = userMap.get(elem);
        newVal[0] = cost;
        userMap.set(getFullName(newDatum), newVal);
        userMap.delete(elem);
        setUserMap(userMap);
      }
      // if (page === "EXPENSE") {
      //   let oldDatum = data.find(x => x.id === elem);
      //   newDatum.id = elem;
      //   newData = data.filter(x => x.id !== elem);
      //   if (userMap.has(getFullName(oldDatum)))
      //   userMap.set(getFullName(oldDatum),
      //   userMap.)
      // }
      setData(newData);
    }
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
          updatedDatumHandler={handleUpdatedDatum}/>
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