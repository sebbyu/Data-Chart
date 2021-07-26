import './../scss/TableHead.scss';
// Helper
import {tableHeadMap} from './../../helpers/pageMap';

export default function TableHead(props) {

  return (
    <thead className="component-table_head">
      <tr id="table_head">
        <td></td>
        {tableHeadMap.get(props.currentHead).map((x,i) => {
          return <td key={i}>{x}</td>
        })}
      </tr>
    </thead>
  )
}