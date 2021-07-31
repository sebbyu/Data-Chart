import './../scss/AlertMessage.scss';
import propTypes from 'prop-types';

export default function AlertMessage(props) {

  AlertMessage.propTypes = {
    message: propTypes.string,
  }

  return (
    <div className="component-alert_message">
      <h5>{props.message}</h5>
    </div>
  )
}