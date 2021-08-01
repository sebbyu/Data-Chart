import './../scss/EditForm.scss';
import propTypes from 'prop-types';
// hooks
import {useState, useEffect} from 'react';
// helpers
import {newUserForm} from './../../helpers/pageMap';

export default function EditForm(props) {

  const [newDatum, setNewDatum] = useState(newUserForm);

  EditForm.propTypes = {
    currentPage: propTypes.string,
    updatedDatumHandler: propTypes.func,
  }

  useEffect(() => {
    const sendingToParent = () => {
      props.updatedDatumHandler(newDatum);
    }
    sendingToParent();
  }, [props, newDatum]);


  const handleChange = (event) => {
    const {name, value} = event.target;
    setNewDatum({
      ...newDatum,
      [name]: value
    })
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
        <select>
          <option>---------</option>
        </select>
      </td>
      <td>
        <select>
          <option>---------</option>
        </select>
      </td>
      <td>
        <input type="text" />
      </td>
      <td>
        <input type="text" />
      </td>
    </>
  )
}