import './../scss/Table.scss';
// assets
import jsonData from '../../assets/dummy_data.json';
// Hooks
import {useState} from 'react';
// Component
import TableHead from './TableHead';
import TableBody from './TableBody';
import Button from './Button';


export default function Table(props) {

  const [data, setData] = useState(jsonData);
  const [adding, setAdding] = useState(false);


  const getCurrentDate = () => {
    var d = new Date().toISOString().split('T')[0];
    return d;
  }
  const initialForm = {
    "id": data.length+1,
    "first name": "",
    "last name": "",
    "expense": {
      "category": "N/A",
      "cost": 0,
      "date": getCurrentDate()
    },
    "budget": 400
  }

  

  const [newData, setNewData] = useState(initialForm);

  const addForm = () => {
    if (adding) {
      return (
        <div>
          <form>
            <input 
              type="text" name="first name" 
              value={newData['first name']}
              onChange={handleNewUser}/>
            <input type="text" name="last name" 
              value={newData['last name']}
              onChange={handleNewUser}/>
          </form>
          <Button name="Insert" clickHandler={addData}/>
        </div>
      )
    } 
  }

  const handleNewUser = (e) => {
    const {name, value} = e.target;
    setNewData({
      ...newData,
      [name]: value
    })
  }

  const addData = () => {
    data.push(newData);
    setData(data);
    setAdding(!adding);
    setNewData(initialForm);
  }

  const handleClick = (logoButton, datum) => {
    console.log(logoButton);
    console.log(datum);
  }

  return (
    <div className="component-table">
      <table id="table" border='1px' width="100%">
        <TableHead
          currentHead={props.currentPage}/>
        <TableBody
          currentBody={props.currentPage}
          data={data}
          clickHandler={handleClick}/>
      </table>
      <Button 
        name={adding ? "Cancel" : "Add+"} 
        clickHandler={() => setAdding(!adding)}/>
      {addForm()}
    </div>
  )
}