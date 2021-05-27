import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import Modal from './Modal';
import Report from './Report';
import HPReport from './HPReport';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  


function App() {
	const [patient,setPatient] = useState('')
	const [patientList,setPatientList] = useState([]);
	const [details,setDetails] = useState([])
	const [nhdata,setNhdata] = useState([])
	const [khdata,setKhdata] = useState([])
	const [nddata,setNddata] = useState([])
	const [kddata,setKddata] = useState([])
	const [hddata,setHddata] = useState([])
	const [hppatientdata,setHppatientdata] = useState([])
	const [show,setShow] = useState(false)
	const [showReportModal,setShowReportModal] = useState(false)
	const [showHPReport,setShowHPReport] = useState(false)

	const search = () => {
		const results = []
		const singlepatient = patientList.find(record => record.name.toLowerCase()==patient.toLowerCase())
		results.push(singlepatient)
		setPatientList(results)
	}

	const reset = () => {
		Axios.get(`http://localhost:3001/`).then((response) => {
			setPatientList(response.data)
		})
	}

	useEffect(() => {
		Axios.get('http://localhost:3001/').then((response) => {
			setPatientList(response.data)
	    })
	},[])

	const viewPatient = (patient_id) => {
		Axios.get(`http://localhost:3001/patientdetails/${patient_id}`).then((response) => {
			const patient = patientList.find(record => record.patient_id==patient_id)
			patient.htn_status =  'N/A';
			patient.dm_status = 'N/A';
			if(response.data.length > 0){
				patient.htn_status = (response.data[0].htn_status) ? response.data[0].htn_status : 'N/A';
				patient.dm_status = (response.data[0].dm_status) ? response.data[0].dm_status : 'N/A';
			}
			setDetails(patient)
			setShow(true)
		})
	}

	const showReport = () => {
		Axios.get(`http://localhost:3001/nhreport`).then((response) => {
			setNhdata(response.data)
		})

		Axios.get(`http://localhost:3001/khreport`).then((response) => {
			setKhdata(response.data)
		})

		Axios.get(`http://localhost:3001/ndreport`).then((response) => {
			setNddata(response.data)
		})

		Axios.get(`http://localhost:3001/kdreport`).then((response) => {
			setKddata(response.data)
			setShowReportModal(true)
		})

		/*const requestOne = axios.get(`http://localhost:3001/nhreport`);
		const requestTwo = axios.get(`http://localhost:3001/khreport`);
		const requestThree = axios.get(`http://localhost:3001/ndreport`);
		const requestFour = axios.get(`http://localhost:3001/kdreport`);


		axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
		  const responseOne = responses[0]
		  const responseTwo = responses[1]
		  const responesThree = responses[2]
		  const responesFour = responses[3]

		  setNhdata(responseOne)
		  setKhdata(responseTwo)
		  setNddata(responseOne)
		  setKddata(responseOne)
		  // use/access the results 
		})).catch(errors => {
		  // react on errors.
		})*/
	}

	const showPatientsReport = (report) => {
		/*switch (response){
			case 1:
				Axios.get(`http://localhost:3001/hppatientsreport`).then((response) => {
					//setNhdata(response.data)
					setHppatientdata(response.data)
					setShowHPReport(true)
				})
				setShowReportModal(false)
				}
				break;
			case 2:
				Axios.get(`http://localhost:3001/khppatientsreport`).then((response) => {
					//setNhdata(response.data)
					setHppatientdata(response.data)
					setShowHPReport(true)
				})
				setShowReportModal(false)
				}
				break;*/
	}

	return (
	    <div className="container">
	      <h1 style={{fontFamily:'Cochin'}}>Chronic Disease Management System</h1>
	      <TextField type="text" placeholder="Search Patients" onChange={(e) => {
	      	setPatient(e.target.value)
	      }}/>
	      <br/>
	      <Button variant="contained" color="primary" onClick={search} style={{marginRight:10,marginTop:10}}>
	      	Search
	      </Button>
	      <Button variant="contained" color="secondary" onClick={reset} style={{marginRight:10,marginTop:10}}>
	      	View All
	      </Button>
	      <br/>
	      <Button variant="contained" color="primary" onClick={showReport} style={{marginRight:10,marginTop:10,marginBottom:10}}>
	      	View CDM Monthly Report
	      </Button>
	      <div id="searchresults">
	      	<Table>
		      	<TableHead>
		      		<TableRow><TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>Date of Birth</TableCell><TableCell>Gender</TableCell><TableCell>Phone Number</TableCell><TableCell>Action</TableCell></TableRow>
		        </TableHead>
		        <TableBody>
		        {patientList.map((val) => {
			        return <TableRow>
			        	<TableCell>{val.patient_id}</TableCell>
			        	<TableCell>{val.name}</TableCell>
			        	<TableCell>{val.dob}</TableCell>
			        	<TableCell>{val.gender}</TableCell>
			        	<TableCell>{val.phone_number}</TableCell>
			        	<TableCell><Button onClick={() => viewPatient(val.patient_id)} variant="contained" style={{backgroundColor:"#add8e6"}}>Details</Button></TableCell>
			        </TableRow>
			    })}
			    </TableBody>
	      	</Table>
	      </div>
	      <Modal details={details} show={show} onClose={() => setShow(false)}/>
	      <Report 
	      	nhdata={nhdata} 
	      	khdata={khdata} 
	      	nddata={nddata} 
	      	kddata={kddata} 
	      	hddata={hddata} 
	      	show={showReportModal} 
	      	onClose={() => setShowReportModal(false)}
	      	newHpPatients={() => {showPatientsReport(1)}}
	      	knownHpPatients={() => {showPatientsReport(2)}}
	      	newDPatients={() => {showPatientsReport(3)}}
	      	knownDPatients={() => {showPatientsReport(4)}}
	      	/>
	      <HPReport hppatientdata={hppatientdata} show={showHPReport} onClose={() => setShowHPReport(false)}/>
	    </div>
  	);
}

export default App;
