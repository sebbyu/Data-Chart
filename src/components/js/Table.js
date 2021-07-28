import './../scss/Table.scss';
// assets
import jsonData from '../../assets/dummy_data.json';
// Hooks
import {useState} from 'react';
// Component
import TableHead from './TableHead';
import TableBody from './TableBody';
import LogoButton from './LogoButton';


export default function Table(props) {

  const [data, setData] = useState(jsonData);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(-1);


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
    logoButton === 'DELETE' ? 
    setData(data.filter(x => x !== datum)) :
    editData(datum);
  }

  const editData = (datum) => {
    var num = editing === datum['id'] ? 
    -1 : datum['id'];
    setEditing(num);
  }

  const handleUpdateData = (newD) => {
    const newData = data.map(datum => {
      if (datum['id'] === newD['id']) {
        return newD;
      } else {
        return datum;
      }
    })
    setData(newData);
  }

  const createForm = () => {
    return (
      <div style={{display: props.currentPage === "COMPANY EXPENSES" ? 
      'none' : 'block'}}>
        <LogoButton
          name={adding ? "CANCEL" : "PLUS"} 
          clickHandler={() => setAdding(!adding)}/>
        {addForm()}
      </div>
    )
  }

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
            <LogoButton name="INSERT" clickHandler={addData}/>
          </form>
        </div>
      )
    } 
  }

  return (
    <div className="component-table">
      <table id="table" border='1px' width="100%">
        <TableHead
          currentHead={props.currentPage}/>
        <TableBody
          currentBody={props.currentPage}
          data={data}
          clickHandler={handleClick}
          editingDatum={editing}
          updateData={handleUpdateData}/>
      </table>
      {/* {createForm()} */}
    </div>
  )
}