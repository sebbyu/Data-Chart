import './../scss/Logo.scss';
import propTypes from 'prop-types';
// helper
import {logoMap} from './../../helpers/pageMap';

export default function Logo(props) {

  Logo.propTypes = {
    name: propTypes.string,
  }
  
  return (
    <div className="component-logo">
      <span className={logoMap.get(props.name)}></span>
    </div>
  )
}