import { Modal, Button, Row } from "react-bootstrap";
import styled from "styled-components";
import "./CallPopUp.css";

const Video1 = styled.video`
  border: 1px solid blue;
  width: 60%;
  height: 100%;
`;

const Video2 = styled.video`
  border: 1px solid blue;
  width: 40%;
  height: 50%;
`;

const CallPopUP = (props)=>{

    return(
        <Modal
        show="true"
        fullscreen={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Call
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { props.partnerVideo && <Video1 playsInline muted ref={props.partnerVideo} autoPlay />}
            {props.partnerVideo && <Video2 playsInline ref={props.userVideo} autoPlay />}
        </Modal.Body>
        <Modal.Footer className="modelFooter">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.myVideoStatus?'#1E90FF':'red'} className="bi bi-camera-video-fill videoCallStateIcon" viewBox="0 0 16 16" onClick={props.updateVideo}>
              <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.myMicStatus?"#1E90FF":'red'} className="bi bi-mic-fill videoCallStateIcon" viewBox="0 0 16 16" onClick={props.updateMic}>
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-telephone-x-fill videoCallStateIcon" viewBox="0 0 16 16" onClick={props.endCall}>
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zm9.261 1.135a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
          </svg>
          </div>
        </Modal.Footer>
      </Modal>
    )

}

export default CallPopUP;