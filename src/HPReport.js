import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

const Report = (props) => {
	const [reportData,setReportData] = useState([])

	if(!props.show){
		return null
	}

	return (
		<div className="modal">
			<div className="report-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header">
					<h2>Individual Patient Data</h2>
				</div>
				<div className="modal-body">
					<table>
		      	<thead>
		      		<tr><th>Patient Name</th><th>Encounter Date</th><th>Gender</th><th>Age</th></tr>
		        </thead>
		        <tbody>
		        {props.data.map((val) => {
			        return <tr>
			        	<td>{val.PatinentName}</td>
			        	<td>{val.encounter_datetime}</td>
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