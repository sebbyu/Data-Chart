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


export default function TableBody(props) {

   TableBody.propTypes = {
    currentPage: propTypes.string,
    currentData: propTypes.object,
    clickHandler: propTypes.func,
  }


  var currentHead = tableHeadMap.get(props.currentPage);

  const handleClick = (name, elem) => {
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
            <td>{key.split(' ')[0]}</td>
            <td>{key.split(' ')[1]}</td>
            <td>{total.get(key)}</td>
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
            {currentHead.map((head, j) => {
              head = head.toLowerCase();
              var elem = datum[head] === undefined ?
              resolveUndefinedElem(
                props.currentPage, props.currentData, datum, head)
              : datum[head];
              return (
                <td key={j}>
                  {elem}
                </td>
              )
            })}
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
            <td>{entry[0]}</td>
            <td>{entry[1]}</td>
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