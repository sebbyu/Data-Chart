import './../scss/AddForm.scss';  
import LogoButton from './LogoButton';
import {useState} from 'react';
import {newUserForm, categories} from './../../helpers/pageMap';
import {getFullName} from './../../helpers/helperFunc';

export default function AddForm(props) {

  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState(newUserForm);

  const handleLogoClick = name => {
    setAdding(!adding);
    if (name === "INSERT") {
      if (props.currentPage === "USERS") {
        if (newData['first name'] !== '' && newData['last name'] !== '') {
          props.addNewData(newData);
          setNewData(newUserForm);
        } else {
          setAdding(true);
        }
      }
      if (props.currentPage === "EXPENSE") {
        if (newData['expense']['cost'] !== '' && 
        newData['expense']['date'] !== '' &&
        newData['expense']['category'] !== '' &&
        newData['first name'] !== '' && newData['last name'] !== '') {
          props.addNewData(newData);
          setNewData(newUserForm);
        } else {
          setAdding(true);
        }
      }
    }
  }
  
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (props.currentPage === "EXPENSE") {
      if (name === "full name") {
        setNewData({
          ...newData,
          'first name': value.split(" ")[0],
          'last name': value.split(" ")[1]
        })
      } else {
        var temp = {...newData};
        temp['expense'][name] = value;
        setNewData({
          ...temp
        })
      }
    } else {
      setNewData({
        ...newData,
        [name]: value
      })
    }
    
    
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
    if (props.currentPage === "USERS") {
      return addUserForm();
    }
    return addExpenseForm();
  }

  const addUserForm = () => {
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

  const addExpenseForm = () => {
    var uniqueUsers = new Map();
    props.currentData.forEach((datum) => {
      uniqueUsers.set(getFullName(datum), 0);
    })
    return (
      <form>
        <select name="full name" id="users" onChange={handleInputChange}>
          <option value="">-------</option>
          {[...uniqueUsers.keys()].map((key, i) => {
            return (
              <option key={i}
                value={key}>{key}</option>
            )
          })}
        </select>
        <select name="category" id="categories" onChange={handleInputChange}>
          <option value="">-------</option>
          {categories.map((category, i) => {
            return (
              <option key={i} value={category}>{category}</option>
            )
          })}
        </select>
        <input type="text" name="cost"
          value={newData['expense']['cost']}
          onChange={handleInputChange}/>
        <input type="text" name="date"
          value={newData['expense']['date']}
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

  