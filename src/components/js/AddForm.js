import './../scss/AddForm.scss';  
import LogoButton from './LogoButton';
import {useState} from 'react';
import {newUserForm} from './../../helpers/pageMap';

export default function AddForm(props) {

  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState(newUserForm);

  const handleLogoClick = name => {
    setAdding(!adding);
    name === "INSERT" ? 
    props.addNewData(newData) :
    setAdding(!adding);
    setNewData(newUserForm);

  }
  
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setNewData({
      ...newData,
      [name]: value
    })
  }

  const createForm = () => {
    return (
      <div style={{display: props.currentPage === "COMPANY EXPENSES" ?
        'none' : 'block'}}>
        <LogoButton
          name={adding ? "CANCEL" : "PLUS"}
          clickHandler={handleLogoClick}/>
        {adding ? 
        (addForm()):
        (<></>)}
      </div>
    )
  }

  const addForm = () => {
    return (
      <form>
        <input
          type="text" name="first name"
          value={newData['first name']}
          onChange={handleInputChange}/>
        <input
          type="text" name="last name"
          value={newData['last name']}
          onChange={handleInputChange}/>
        <LogoButton name="INSERT" clickHandler={handleLogoClick}/>
      </form>
    )
  }
  
  return (
    <div className="component-add_form">
      {createForm()}
    </div>
  )

}

  