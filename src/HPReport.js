import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  

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
					<Table>
		      	<TableHead>
		      		<TableRow><TableCell>Patient Name</TableCell><TableCell>Encounter Date</TableCell><TableCell>Gender</TableCell><TableCell>Age</TableCell></TableRow>
		        </TableHead>
		        <TableBody>
		        {props.data.map((val) => {
			        return <TableRow>
			        	<td>{val.PatinentName}</td>
			        	<td>{val.encounter_datetime}</td>
			        	<td>{val.gender}</td>
			        	<td>{val.age}</td>
			        </TableRow>
			    })}
			    </TableBody>
	      	</Table>
				</div>
				<div className="modal-footer">
					<Button variant="contained" style={{backgroundColor:"#ff0000",color:'white'}} className="closemodal" onClick={props.onClose}>Close</Button>
				</div>
			</div>
		</div>
	)
} 

export default Report;