import './../scss/Logo.scss';
import propTypes from 'prop-types';

export default function Logo(props) {

  var logoClass = new Map();
  logoClass.set('USERS', 'fas fa-users');
  logoClass.set('EXPENSE', 'fas fa-dollar-sign');
  logoClass.set('COMPANY EXPENSES', 'fas fa-building');


  Logo.propTypes = {
    name: propTypes.string,
  }
  
  return (
    <div className="component-logo">
      <span className={logoClass.get(props.name)}></span>
    </div>
  )
}