import React from 'react';
import './../scss/TableBody.scss';
// helper
import {tableHeadMap} from './../../helpers/pageMap';
import {resolveUndefined} from './../../helpers/helperFunc';
// Component
import LogoButton from './LogoButton';


export default function TableBody(props) {

  var currentPage = props.currentBody;
  var currentData = props.data;
  var currentHead = tableHeadMap.get(currentPage);

  const handleClick = () => {
    console.log("a")
  }


  const createTable = () => {
    return (
      currentData.map((datum, i) => {
        return (
          <tr key={i}>
            <td>
              <LogoButton 
                name="EDIT"
                clickHandler={handleClick}/>
              <LogoButton 
                name="DELETE"
                clickHandler={handleClick}/>
            </td>
            {currentHead.map((head, j) => {
              head = head.toLowerCase();
              var elem = datum[head] === undefined ? 
              resolveUndefined(currentPage, currentData, datum, head) : 
              datum[head];
              return (
                <td key={j}>{elem}</td>
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