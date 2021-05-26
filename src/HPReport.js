import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

const Report = (props) => {
	const [reportData,setReportData] = useState([])

	if(!props.show){
		return null
	}

	return (
		<div className="modal" onClick={props.onClose}>
			<div className="report-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header">
					<h2>CDM Monthly Report For Diabetic and Hypertensive Patients</h2>
				</div>
				<div className="modal-body">
					<table>
		      	<thead>
		      		<tr><th>Patient Name</th><th>Encounter Date</th><th>Location</th><th>Hypertension Status</th><th>Gender</th><th>Age</th></tr>
		        </thead>
		        <tbody>
		        {props.hppatientdata.map((val) => {
			        return <tr>
			        	<td>{val.PatinentName}</td>
			        	<td>{val.encounter_datetime}</td>
			        	<td>{val.Location}</td>
			        	<td>{val.HypertensionStatus}</td>
			        	<td>{val.gender}</td>
			        	<td>{val.age}</td>
			        </tr>
			    })}
			    </tbody>
	      	</table>
				</div>
				<div className="modal-footer">
					<button className="closemodal" onClick={props.onClose}>Close</button>
				</div>
			</div>
		</div>
	)
} 

export default Report;