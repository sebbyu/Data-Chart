import React from 'react';
import './../scss/TableBody.scss';
// helper
import {tableHeadMap} from './../../helpers/pageMap';
import {resolveUndefinedElem, 
getFullName} from './../../helpers/helperFunc';
// Component
import LogoButton from './LogoButton';


export default function TableBody(props) {

  var currentHead = tableHeadMap.get(props.currentPage);

  const handleClick = (name, fullName) => {
    console.log(fullName);
  }

  const createUpdatingButtons = fullName => {
    if (props.currentPage !== "COMPANY EXPENSES") {
      return (
        <td>
          <LogoButton
            name="EDIT"
            clickHandler={handleClick}
            datumFullName={fullName}/>
          <LogoButton
            name="DELETE"
            clickHandler={handleClick}
            datumFullName={fullName}/>
        </td>
      )
    }
  }

  const createUserTable = () => {
    var map = new Map();
    props.currentData.forEach((datum, i) => {
      if (!map.has(getFullName(datum))) {
        map.set(getFullName(datum), 0);
      }
    })
    props.currentData.forEach((datum, i) => {
      map.set(getFullName(datum), 
      map.get(getFullName(datum)) + datum['expense']['cost'])
    })
    return (
      [...map.entries()].map((entry, i) => {
        return (
          <tr key={i}>
            {createUpdatingButtons(entry[0])}
            <td>{entry[0].split(' ')[0]}</td>
            <td>{entry[0].split(' ')[1]}</td>
            <td>{entry[1]}</td>
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
            {createUpdatingButtons(getFullName(datum))}
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
    var categories = ['Food', 'Travel', 'Health', 'Supplies'];
    var map = new Map();
    categories.forEach(cat => {
      map.set(cat, 0);
    })
    props.currentData.forEach((datum, i) => {
      if (map.has(datum['expense']['category'])) {
        map.set(datum['expense']['category'],
        map.get(datum['expense']['category'])+datum['expense']['cost']);
      }
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