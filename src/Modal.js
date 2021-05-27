import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

const Modal = (props) => {
	if(!props.show){
		return null
	}
	return (
		<div className="modal" onClick={props.onClose}>
			<div className="modal-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header">
					<h2>{props.details.name}</h2>
				</div>
				<div className="modal-body">
					<p>{props.details.gender}</p>
					<p>{props.details.dob}</p>
					<p>{props.details.phone_number}</p>
					<p>HTN Status: {props.details.htn_status}</p>
					<p>DM Status: {props.details.dm_status}</p>
				</div>
				<div className="modal-footer">
					<Button variant="contained" style={{backgroundColor:"#ff0000",color:'white'}} className="closemodal" onClick={props.onClose}>Close</Button>
				</div>
			</div>
		</div>
	)
} 

export default Modal;