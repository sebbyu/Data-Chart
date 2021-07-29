import './../scss/Table.scss';
// Component
import TableHead from './TableHead';
import TableBody from './TableBody';


export default function Table(props) {

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

  return (
    <div className="component-table">
      <table id="table" border='1px' width="100%">
        <TableHead
          currentHead={props.currentPage}/>
        <TableBody 
          currentPage={props.currentPage}
          currentData={props.currentData}/>
      </table>
    </div>
  )
}