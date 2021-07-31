import './../scss/Navbar.scss';
import propTypes from 'prop-types';
// Component
import LogoButton from './LogoButton';

export default function Navbar(props) {

  Navbar.propTypes = {
    clickHandler: propTypes.func,
  }

  const handleClick = currentPage => {
    props.clickHandler(currentPage);
  }

  return (
    <div className="component-navbar">
      <div>
        <LogoButton name="USERS" clickHandler={handleClick}/>
        <LogoButton name="EXPENSE" clickHandler={handleClick}/>
        <LogoButton name="COMPANY EXPENSES" clickHandler={handleClick}/>
      </div>
    </div>
  )
}