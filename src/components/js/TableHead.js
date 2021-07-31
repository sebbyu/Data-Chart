import './../scss/TableHead.scss';
import propTypes from 'prop-types';
// helpers
import {tableHeadMap} from './../../helpers/pageMap';

export default function TableHead(props) {

  TableHead.propTypes = {
    currentHead: propTypes.string,
  }

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