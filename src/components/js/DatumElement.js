import './../scss/DatumElement.scss';
import propTypes from 'prop-types';

export default function DatumElement(props) {

  DatumElement.propTypes = {
    elements: propTypes.array,
  }

  return (
    props.elements.map((element, i) => {
      return (
        <td key={i}>{element}</td>
      )
    })
  )
}