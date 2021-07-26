import './../scss/Button.scss';
import propTypes from 'prop-types';

export default function Button(props) {

  Button.propTypes = {
    name: propTypes.string,
    clickHandler: propTypes.func,
  }

  const handleClick = () => {
    props.clickHandler(props.name);
  }

  return (
    <div className="component-button">
      <button onClick={handleClick}>{props.name}</button>
    </div>
  )
}