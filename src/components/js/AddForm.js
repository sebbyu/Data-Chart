import './../scss/AddForm.scss';  
import propTypes from 'prop-types';
// components
import LogoButton from './LogoButton';
// hooks
import {useState} from 'react';
// helpers
import {newUserForm, categories} from './../../helpers/pageMap';
import {getFullName} from './../../helpers/helperFunc';

export default function AddForm(props) {

  AddForm.propTypes = {
    currentPage: propTypes.string,
    addNewData: propTypes.func,
    currentData: propTypes.array,
  }

  const [adding, setAdding] = useState(false);
  const [newDatum, setNewDatum] = useState(newUserForm);

  const handleLogoClick = name => {
    if (name !== "INSERT") {
      setAdding(!adding);
      setNewDatum(newUserForm);
    } 
    let pass = false;
    if (name === "INSERT") {
      if (props.currentPage === "USERS") {
        if (newDatum['first name'] !== '' && newDatum['last name'] !== '') {
          pass = true;
        }
      }
      if (props.currentPage === "EXPENSE") {
        if (newDatum['expense']['cost'] !== '' && 
        newDatum['expense']['date'] !== '' &&
        newDatum['expense']['category'] !== '' &&
        newDatum['first name'] !== '' && newDatum['last name'] !== '') {
          pass = true;
        }
      }
    }
    if (pass) {
      props.addNewData(newDatum);
      setAdding(!adding);
      setNewDatum(newUserForm);
    }
    
  }
  
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (props.currentPage === "USERS") {
      setNewDatum({
        ...newDatum,
        [name]: value
      })
    }
    if (props.currentPage === "EXPENSE") {
      if (name !== 'full name') {
        var temp = JSON.parse(JSON.stringify(newDatum));
        temp['expense'][name] = value;
        setNewDatum({
          ...temp
        })
      }
      if (name === "full name") {
        setNewDatum({
          ...newDatum,
          'first name': value.split(" ")[0],
          'last name': value.split(" ")[1]
        })
      }
    } 
  }

  const addUserForm = () => {
    return (
      <form>
        <input
          type="text" name="first name"
          value={newDatum['first name']}
          onChange={handleInputChange}/>
        <input
          type="text" name="last name"
          value={newDatum['last name']}
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
        <input type="number" name="cost"
          value={newDatum['expense']['cost']}
          onChange={handleInputChange}/>
        <input type="date" name="date"
          value={newDatum['expense']['date']}
          onChange={handleInputChange}/>
        <LogoButton name="INSERT" clickHandler={handleLogoClick}/>
      </form>
    )
  }

  const addForm = () => {
    if (props.currentPage === "USERS") {
      return addUserForm();
    }
    return addExpenseForm();
  }

  const createForm = () => {
    return (
      <div style={{display: props.currentPage === "COMPANY EXPENSES" ?
        'none' : 'block'}}>
        <LogoButton
          name={adding ? "CANCEL" : "PLUS"}
          clickHandler={handleLogoClick}/>
        {adding && addForm()}
      </div>
    )
  }
  
  return (
    <div className="component-add_form">
      {createForm()}
    </div>
  )

}

  