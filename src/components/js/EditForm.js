import './../scss/EditForm.scss';
import propTypes from 'prop-types';

export default function EditForm(props) {

  EditForm.propTypes = {
    currentPage: propTypes.string,
  }

  if (props.currentPage === "USERS") {
    return (
      <>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
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