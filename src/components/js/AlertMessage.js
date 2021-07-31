import './../scss/AlertMessage.scss';

export default function AlertMessage(props) {
  return (
    <div className="component-alert_message">
      <h5>{props.message}</h5>
    </div>
  )
}