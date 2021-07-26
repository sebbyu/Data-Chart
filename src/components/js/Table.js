import './../scss/Table.scss';
// assets
import jsonData from '../../assets/dummy_data.json';
// Hooks
import {useState} from 'react';
// Component
import TableHead from './TableHead';
import TableBody from './TableBody';


export default function Table(props) {
  
  const [data, setData] = useState(jsonData);

  return (
    <div className="component-table">
      <table id="table" border='1px'>
        <TableHead
          currentHead={props.currentPage}/>
        <TableBody
          currentBody={props.currentPage}
          data={data}/>
      </table>
    </div>
  )
}