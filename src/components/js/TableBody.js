import './../scss/TableBody.scss';
import propTypes from 'prop-types';
// helpers
import {tableHeadMap} from './../../helpers/pageMap';
import {
  resolveUndefinedElem, 
  getFullName
} from './../../helpers/helperFunc';
// components
import LogoButton from './LogoButton';
import EditForm from './EditForm';
import DatumElement from './DatumElement';
// hooks
import {useState} from 'react';


export default function TableBody(props) {

  const [editingDatum, setEditingDatum] = useState(-1);
  // const [editing, setEditing] = useState(false);

   TableBody.propTypes = {
    currentPage: propTypes.string,
    currentData: propTypes.array,
    clickHandler: propTypes.func,
  }

  var currentHead = tableHeadMap.get(props.currentPage);

  const handleClick = (name, elem) => {
    setEditingDatum(elem);
    console.log(editingDatum);
    props.clickHandler(name, elem);
  }

  const createUpdatingButtons = elem => {
    if (props.currentPage !== "COMPANY EXPENSES") {
      return (
        <td>
          <LogoButton
            name="EDIT"
            clickHandler={handleClick}
            elem={elem}/>
          <LogoButton
            name="DELETE"
            clickHandler={handleClick}
            elem={elem}/>
        </td>
      )
    }
  }

  const createUserTable = () => {
    var total = new Map();
    var ids = new Map();
    props.currentData.forEach((datum, i) => {
      total.set(getFullName(datum),
      total.has(getFullName(datum)) ? 
      total.get(getFullName(datum)) + parseInt(datum['expense']['cost']) :
      parseInt(datum['expense']['cost']));
      ids.set(getFullName(datum), datum['id']);
    })
    return (
      [...ids.keys()].map((key, i) => {
        return (
          <tr key={i}>
            {createUpdatingButtons(key)}
            {
              key === editingDatum ? 
              (<EditForm currentPage={props.currentPage}/>) :
              (<DatumElement elements={[
                key.split(' ')[0],key.split(' ')[1],total.get(key)]}/>)
            }
          </tr>
        )
      })
    )
  }

  const createExpenseTable = () => {
    return (
      props.currentData.map((datum, i) => {
        return (
          <tr key={i}>
            {createUpdatingButtons(datum['id'])}
            {
              editingDatum === datum['id'] ? 
              (<EditForm currentPage={props.currentPage}/>) :
              (<DatumElement elements={[
                ...currentHead.map((head, j) => {
                  return resolveUndefinedElem(
                    props.currentPage, props.currentData, 
                    datum, head.toLowerCase())
                })
              ]}/>)
            }
          </tr>
        )
      })
    )
  }

  const createCompanyExpensesTable = () => {
    var map = new Map();
    props.currentData.forEach((datum, i) => {
      map.set(datum['expense']['category'], 
      map.has(datum['expense']['category']) ? 
      map.get(datum['expense']['category']) + parseInt(datum['expense']['cost']) :
      parseInt(datum['expense']['cost']))
      
    })
    return (
      [...map.entries()].map((entry, i) => {
        return (
          <tr key={i}>
            <DatumElement elements={[
              entry[0], entry[1]
            ]}/>
          </tr>
        )
      })
    )
  }

  const createTable = () => {
    if (props.currentPage === "USERS") {
      return createUserTable();
    }
    if (props.currentPage === "EXPENSE") {
      return createExpenseTable();
    }
    return createCompanyExpensesTable();
  }

  return (
    <tbody>
      {createTable()}
    </tbody>
  )
}