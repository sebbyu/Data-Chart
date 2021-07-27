import './../scss/TableHead.scss';
// Helper
import {tableHeadMap} from './../../helpers/pageMap';

export default function TableHead(props) {

  const createExtraColumn = () => {
    if (props.currentHead !== "COMPANY EXPENSES") {
      return <td width="50px"></td>
    }
  }

  return (
    <thead className="component-table_head">
      <tr id="table_head">
        {createExtraColumn()}
        {tableHeadMap.get(props.currentHead).map((head,i) => {
          return <td key={i}>{head}</td>
        })}
      </tr>
    </thead>
  )
}