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

  // const [editingDatum, setEditingDatum] = useState(null);
  const [editingElement, setEditingElement] = useState('');
  const [editing, setEditing] = useState(false);

   TableBody.propTypes = {
    currentPage: propTypes.string,
    currentData: propTypes.array,
    clickHandler: propTypes.func,
    updatedDatumHandler: propTypes.func,
  }

  var currentHead = tableHeadMap.get(props.currentPage);

  const handleClick = (name, elem) => {
    if (name === "DELETE") {
      props.clickHandler(name, elem);
      setEditing(false);
      setEditingElement('');
    }
    if (name === 'CANCEL') {
      setEditing(!editing);
      setEditingElement('');
    }
    if (name === "EDIT") {
      setEditing(!editing);
      setEditingElement(elem);
    }
    if (name === "EDITED") {
      props.clickHandler(name, elem);
      setEditing(!editing);
      setEditingElement('');
    }
  }

  const createUpdatingButtons = elem => {
    if (props.currentPage !== "COMPANY EXPENSES") {
      return (
        <td>
          <LogoButton
            name={editing && elem === editingElement ? "EDITED" : "EDIT"}
            clickHandler={handleClick}
            elem={elem}/>
          <LogoButton
            name={editing && elem === editingElement ? "CANCEL" : "DELETE"}
            clickHandler={handleClick}
            elem={elem}/>
        </td>
      )
    }
  }

  const handleUpdatedDatum = newDatum => {
    props.updatedDatumHandler(newDatum);
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
              key === editingElement ? 
              (<EditForm currentPage={props.currentPage}
                updatedDatumHandler={handleUpdatedDatum}/>) :
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
              editingElement === datum['id'] ? 
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