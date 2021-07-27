import './../scss/LogoButton.scss';
import propTypes from 'prop-types';
// helper
import {logoMap} from './../../helpers/pageMap';

export default function Logo(props) {

  Logo.propTypes = {
    name: propTypes.string,
  }

  const handleClick = () => {
    props.clickHandler(props.name, props.datum);
  };
  
  return (
    <span className="component-logo">
      <div 
        className={logoMap.get(props.name)}
        onClick={handleClick} id="logo"></div>
    </span>
  )
}