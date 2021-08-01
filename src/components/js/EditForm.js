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
  }

  useEffect(() => {
    const aaa = () => {
      props.test(newDatum);
    }
    aaa();
  }, [props, newDatum]);


  const handleChange = (event) => {
    const {name, value} = event.target;
    setNewDatum({
      ...newDatum,
      [name]: value
    })
    props.test(newDatum);
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
          {/* <button onClick={ttest}>asdfsdf</button> */}
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