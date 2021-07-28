import React from 'react';
import './../scss/TableBody.scss';
// helper
import {tableHeadMap} from './../../helpers/pageMap';
import {resolveUndefined} from './../../helpers/helperFunc';
// Component
import LogoButton from './LogoButton';
import {useState} from 'react';


export default function TableBody(props) {

  var initialForm = {
    "id": 0,
    "first name": "",
    "last name": "",
    "expense": {
      "category": "",
      "cost": 0,
      "date": "",
    },
    "budget": 0
  }

  const [e, setE] = useState(initialForm);

  var currentPage = props.currentBody;
  var currentData = props.data;
  var currentHead = tableHeadMap.get(currentPage);


  const handleClick = (logoButton, datum) => {
    props.clickHandler(logoButton, datum);
  }

  const createUpdatingButtons = (datum) => {
    if (currentPage !== "COMPANY EXPENSES") {
      return <td>
                <LogoButton 
                  name="EDIT"
                  clickHandler={handleClick}
                  datum={datum} />
                <LogoButton 
                  name="DELETE"
                  clickHandler={handleClick}
                  datum={datum} />
              </td>
    }
  }

  const handleChange = (event, datum) => {
    const {name, value} = event.target;
    setE({
      ...datum,
      [name]: value
    })
    props.updateData(e);
  }

  const createTable = () => {
    return (
      currentData.map((datum, i) => {
        return (
          <tr key={i}>
            {createUpdatingButtons(datum)}
            {currentHead.map((head, j) => {
              head = head.toLowerCase();
              var elem = datum[head] === undefined ? 
              resolveUndefined(currentPage, currentData, datum, head) : 
              datum[head];
              return (
                <td key={j}>
                  {datum['id'] === props.editingDatum 
                  && datum[head] !== undefined?
                  (<input type='text' name={head.toLowerCase()} 
                    value={e[head.toLowerCase()]}
                    placeholder={datum[head.toLowerCase()]}
                    onChange={(event) => handleChange(event, datum)}/>):
                  (elem)}
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