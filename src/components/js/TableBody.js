import React from 'react';
import './../scss/TableBody.scss';
// helper
import {tableHeadMap} from './../../helpers/pageMap';
import {resolveUndefinedElem} from './../../helpers/helperFunc';
// Component
import LogoButton from './LogoButton';


export default function TableBody(props) {

  var currentHead = tableHeadMap.get(props.currentPage);

  const handleClick = (name, datum) => {
    console.log(datum);
  }

  const createUpdatingButtons = datum => {
    if (props.currentPage !== "COMPANY EXPENSES") {
      return (
        <td>
          <LogoButton
            name="EDIT"
            clickHandler={handleClick}
            datum={datum}/>
          <LogoButton
            name="DELETE"
            clickHandler={handleClick}
            datum={datum}/>
        </td>
      )
    }
  }

  const createTable = () => {
    return (
      props.currentData.map((datum, i) => {
        return (
          <tr key={i}>
            {createUpdatingButtons(datum)}
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

  return (
    <tbody>
      {createTable()}
    </tbody>
  )
}