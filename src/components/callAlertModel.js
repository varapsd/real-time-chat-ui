import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types'

function CallAlertModel(props){
    return (
      <Modal
        {...props}
        show="true"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>You are getting a call</h4>
          <h3>From {props.caller}</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.acceptCall}>Answer</Button>
          <Button className="Btn" onClick={props.cancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  CallAlertModel.propTypes = {
    acceptCall: PropTypes.element.isRequired
  };

  export default CallAlertModel;