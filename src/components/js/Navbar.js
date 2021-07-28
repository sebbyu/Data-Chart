import './../scss/Navbar.scss';
// Component
import LogoButton from './LogoButton';

export default function Navbar (props) {

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