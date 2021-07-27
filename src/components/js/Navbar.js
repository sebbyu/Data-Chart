import './../scss/Navbar.scss';
// Component
import LogoButton from './LogoButton';
import Button from './Button';
// Hooks

export default function Navbar (props) {

  const handleClick = currentPage => {
    props.clickHandler(currentPage);
  }

  return (
    <div className="component-navbar">
      <LogoButton name={props.currentPage} clickHandler={handleClick}/>
      <div>
        <Button name="USERS" clickHandler={handleClick}/>
        <Button name="EXPENSE" clickHandler={handleClick}/>
        <Button name="COMPANY EXPENSES" clickHandler={handleClick}/>
      </div>
    </div>
  )
}