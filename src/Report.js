import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

const Report = (props) => {
	const [locations,setLocations] = useState([])
	const [reportData,setReportData] = useState([])

	useEffect(() => {
		console.log(props.nddata)
    Axios.get('http://localhost:3001/locations').then((response) => {
    	setLocations(response.data)	      
	    })
	  },[])
	if(!props.show){
		return null
	}

	const createReport = () => {
		console.log(props.nddata)
	        return null;
	    
	}

	return (
		<div className="modal" onClick={props.onClose}>
			<div className="report-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header" onClick={createReport}>
					<h2>CDM Monthly Report For Diabetic and Hypertensive Patients</h2>
				</div>
				<div className="modal-body">
					<table>
		      	<thead>
		      		<tr><th>Month</th><th>Location</th><button className="linkbutton" onClick={props.newHpPatients} style={{}}><th>New Hypertensive</th></button><th>Known Hypertensive</th><th>New Diabetic</th><th>Known Diabetic</th></tr>
		        </thead>
		        <tbody>
		        {locations.map((val) => {
		        	const loc = props.nhdata.find(record => record.name==val.name)
		        	if(loc != null){
			        	val['New Hypertensive'] = loc['New Hypertensive']
			        	
			        } else{
			        	val['New Hypertensive'] = 0
			        	
			        }

			        const kloc = props.khdata.find(record => record.name==val.name)
		        	if(kloc != null){
			        	val['Known Hypertensive'] = kloc['Known Hypertensive']
			        	
			        } else{
			        	val['Known Hypertensive'] = 0
			        	
			        }

			        const ndloc = props.nddata.find(record => record.name==val.name)
		        	if(ndloc != null){
			        	val['New Diabetic'] = ndloc['New Diabetic']
			        	
			        } else{
			        	val['New Diabetic'] = 0
			        	
			        }

			        const kdloc = props.kddata.find(record => record.name==val.name)
		        	if(kdloc != null){
			        	val['Known Diabetic'] = kdloc['Known Diabetic']
			        	
			        } else{
			        	val['Known Diabetic'] = 0
			        	
			        }
			        return <tr>
			        	<td>2021-05</td>
			        	<td>{val.name}</td>
			        	<td>{val['Hypertension Status']}</td>
			        	<td>{val['Known Hypertensive']}</td>
			        	<td>{val['New Diabetic']}</td>
			        	<td>{val['Known Diabetic']}</td>
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