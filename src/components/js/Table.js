import './../scss/Table.scss';
import propTypes from 'prop-types';
// Component
import TableHead from './TableHead';
import TableBody from './TableBody';


export default function Table(props) {

  Table.propTypes = {
    currentPage: propTypes.string,
    currentData: propTypes.array,
    clickHandler: propTypes.func,
  }

  const handleClick = (name, elem, datum) => {
    props.clickHandler(name, elem, datum);
  }

  const test = newDatum => {
    props.test(newDatum)
  }

  return (
    <div className="component-table">
      <table id="table" border='1px' width="100%">
        <TableHead
          currentHead={props.currentPage}/>
        <TableBody 
          currentPage={props.currentPage}
          currentData={props.currentData}
          clickHandler={handleClick}
          test={test}/>
      </table>
    </div>
  )
}


  // const [editing, setEditing] = useState(-1);

  // const handleClick = (logoButton, datum) => {
  //   logoButton === 'DELETE' ? 
  //   setData(data.filter(x => x !== datum)) :
  //   editData(datum);
  // }

  // const editData = (datum) => {
  //   var num = editing === datum['id'] ? 
  //   -1 : datum['id'];
  //   setEditing(num);
  // }

  // const handleUpdateData = (newD) => {
  //   const newData = data.map(datum => {
  //     if (datum['id'] === newD['id']) {
  //       return newD;
  //     } else {
  //       return datum;
  //     }
  //   })
  //   setData(newData);
  // }