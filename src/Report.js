import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import HPReport from './HPReport';
import './App.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  

const Report = (props) => {
	const [locations,setLocations] = useState([])
	const [reportData,setReportData] = useState([])
	const [patientData,setPatientData] = useState([])
	const [show,setShow] = useState(false)

	useEffect(() => {
		console.log(props.nddata)
    Axios.get('http://localhost:3001/locations').then((response) => {
    	setLocations(response.data)	      
	    })
	  },[])
	if(!props.show){
		return null
	}

	const generateReport = (location,category) => {
		if(category == 'newhypertensive'){
			Axios.get(`http://localhost:3001/hppertensionreport/${location}`).then((response) => {
				setPatientData(response.data)
				setShow(true)
			})
		}

		if(category == 'knownhypertensive'){
			Axios.get(`http://localhost:3001/knownhppertensionreport/${location}`).then((response) => {
				setPatientData(response.data)
				setShow(true)
			})
		}

		if(category == 'newdiabetic'){
			Axios.get(`http://localhost:3001/newdiabetic/${location}`).then((response) => {
				setPatientData(response.data)
				setShow(true)
			})
		}

		if(category == 'knowndiabetic'){
			Axios.get(`http://localhost:3001/knowndiabetic/${location}`).then((response) => {
				setPatientData(response.data)
				setShow(true)
			})
		}   
	}

	return (
		<div className="modal" onClick={props.onClose}>
			<div className="report-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header">
					<h2>CDM Monthly Report For Diabetic and Hypertensive Patients</h2>
				</div>
				<div className="modal-body">
					<Table>
		      	<TableHead>
		      		<TableRow>
		      			<TableCell>Month</TableCell>
		      			<TableCell>Location</TableCell>
			      			<TableCell>New Hypertensive</TableCell>
			      			<TableCell>Known Hypertensive</TableCell>
			      			<TableCell>New Diabetic</TableCell>
			      			<TableCell>Known Diabetic</TableCell>
		      			</TableRow>
		        </TableHead>
		        <TableBody>
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
			        return <TableRow>
			        	<td>2021-05</td>
			        	<td>{val.name}</td>
			        	<td><button className="linkbutton" onClick={() => {generateReport(val.name,'newhypertensive')}}>{val['New Hypertensive']}</button></td>
			        	<td><button className="linkbutton" onClick={() => {generateReport(val.name,'knownhypertensive')}}>{val['Known Hypertensive']}</button></td>
			        	<td><button className="linkbutton" onClick={() => {generateReport(val.name,'newdiabetic')}}>{val['New Diabetic']}</button></td>
			        	<td><button className="linkbutton" onClick={() => {generateReport(val.name,'knowndiabetic')}}>{val['Known Diabetic']}</button></td>
			        </TableRow>
			    })}
			    </TableBody>
	      	</Table>
				</div>
				<div className="modal-footer">
					<Button variant="contained" style={{backgroundColor:"#ff0000",color:'white'}} onClick={props.onClose}>Close</Button>
				</div>
			</div>
			<HPReport show={show} data={patientData} onClose={() => setShow(false)}/>
		</div>
	)
} 

export default Report;