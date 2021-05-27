import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css';
import Modal from './Modal';
import Report from './Report';
import HPReport from './HPReport';

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
		Axios.get(`http://localhost:3001/patientsearch/${patient}`).then((response) => {
			setPatientList(response.data)
		})
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
	      <h1>Chronic Disease Management System</h1>
	      <p>Search Patient Records</p>
	      <input type="text" placeholder="Patient Name" onChange={(e) => {
	      	setPatient(e.target.value)
	      }}/>
	      <button onClick={search}>
	      	Search
	      </button>
	      <button onClick={reset}>
	      	View All
	      </button>
	      <br/>
	      <button onClick={showReport}>
	      	View CDM Monthly Report
	      </button>
	      <div id="searchresults">
	      	<table>
		      	<thead>
		      		<tr><th>ID</th><th>Name</th><th>Date of Birth</th><th>Gender</th><th>Phone Number</th><th>Action</th></tr>
		        </thead>
		        <tbody>
		        {patientList.map((val) => {
			        return <tr>
			        	<td>{val.patient_id}</td>
			        	<td>{val.name}</td>
			        	<td>{val.dob}</td>
			        	<td>{val.gender}</td>
			        	<td>{val.phone_number}</td>
			        	<td><button onClick={() => viewPatient(val.patient_id)}>View</button></td>
			        </tr>
			    })}
			    </tbody>
	      	</table>
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
