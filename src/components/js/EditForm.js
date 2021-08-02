import './../scss/EditForm.scss';
import propTypes from 'prop-types';
// hooks
import {useState, useEffect} from 'react';
// helpers
import {newUserForm, categories} from './../../helpers/pageMap';
import {getFullName} from './../../helpers/helperFunc';

export default function EditForm(props) {

  const [newDatum, setNewDatum] = useState(newUserForm);

  EditForm.propTypes = {
    currentPage: propTypes.string,
    updatedDatumHandler: propTypes.func,
    currentData: propTypes.array,
  }

  useEffect(() => {
    const sendingToParent = () => {
      props.updatedDatumHandler(newDatum);
    }
    sendingToParent();
  }, [props, newDatum]);


  const handleChange = (event) => {

    const {name, value} = event.target;
    if (name === "cost" || name === "date") {
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
    else {
      setNewDatum({
        ...newDatum,
        [name]: value,
      })
    }
  }

  if (props.currentPage === "USERS") {
    return (
      <>
        <td>
          <input type="text" name="first name"
            value={newDatum['first name']}
            onChange={handleChange}/>
        </td>
        <td>
          <input type="text" name="last name"
            value={newDatum['last name']}
            onChange={handleChange}/>
        </td>
      </>
    )
  }
  return (
    <>
      <td>
        <select name="full name" onChange={handleChange}>
          <option>---------</option>
          {props.currentData.map((datum, i) => {
            return (
              <option key={i}>{getFullName(datum)}</option>
            )
          })}
        </select>
      </td>
      <td>
        <select name="category" onChange={handleChange}>
          <option>---------</option>
          {categories.map((category, i) => {
            return (
              <option key={i}>{category}</option>
            )
          })}
        </select>
      </td>
      <td>
        <input type="number" name="cost"
          value={newDatum['expense']['cost']}
          onChange={handleChange}/>
      </td>
      <td>
        <input type="date" name="date"
          value={newDatum['expense']['date']}
          onChange={handleChange}/>
      </td>
    </>
  )
}