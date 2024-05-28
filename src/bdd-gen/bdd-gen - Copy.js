// import axios from 'axios';
// import {Buffer} from 'buffer';
// import React, { useState } from 'react';

// import DownloadFileComponent from './DownloadFileComponent';


// function BddGen() {
//     const [projectMgmtTool, setProjectMgmtTool] = useState("azDevOps")
//     const [workItems, setWorkItems] = useState([]);
//     const [selectedStory, setSelectedStory] = useState('');
//     const [selectedStoryDesc, setSelectedStoryDesc] = useState('');
//     const [selectedStoryIteration, setselectedStoryIteration] = useState('');
//     const [generatedTestCase, setGeneratedTestCase] = useState('');
//     const onToolOptChange = (e) => {
//         setProjectMgmtTool(e.target.value)
//     }
//     const handleChangeUserStory = (event) => {
//         setSelectedStory(event.target.value);
//         if(event.target.value != "-1")
//         {
//             let wi = workItems.find(x => x['System.Id'] == event.target.value);
//             setSelectedStoryDesc(wi['System.Description']);
//             setselectedStoryIteration(wi['System.IterationPath'])
//         }
//         else
//         {
//             setSelectedStoryDesc('');
//             setselectedStoryIteration('');
//         }
//         setGeneratedTestCase('');
//     };

    
//     const connectAgileBoard = async () => {
//         if(projectMgmtTool == "azDevOps")
//         {
//             connectAzureDevOps();
//         }
//         else
//         {
//             connectJIRABoard();
//         }
//     }
//     const connectAzureDevOps = async () => {
//         const projectName = "GenAIBDD";
        
//         // Your API endpoint
//         const baseUrl = `${process.env.REACT_APP_AZURE_DEV_OPS_BASE_URL}/${process.env.REACT_APP_AZURE_DEV_OPS_ORG_NAME}/${projectName}`;

//         const wiql = `/_apis/wit/wiql?api-version=5.1`;        
//         const fields = `System.Id,System.Title,System.Description,System.IterationPath,System.State,System.CreatedBy`;        
//         const query = {
//             "query": "Select [System.Id] From WorkItems Where [System.WorkItemType] = 'Issue' AND [State] <> 'Closed' AND [State] <> 'Removed' order by [System.CreatedDate] desc"
//           };
//         const username = 'yourUsername';
//         const password = `${process.env.REACT_APP_AZURE_DEV_OPS_PAT}`;

//         // Encode credentials to Base64
//         const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

//         const queryGetIssuesId = baseUrl + wiql;
        
//         try {
//             const response = await axios.post(queryGetIssuesId, query, {
//                 headers: {
//                     'Authorization': `Basic ${token}`
//                 }
//             });
//             const allIds = response.data.workItems.map(x => x.id).toString();
            
//             const queryGetWorkItems = baseUrl + `/_apis/wit/workitems?ids=${allIds}&fields=${fields}&api-version=7.1-preview.3`;
//             const responseWorkItsm = await axios.get(queryGetWorkItems,{
//                 headers: {
//                     'Authorization': `Basic ${token}`
//                 }
//             });
            
//             setWorkItems(responseWorkItsm.data.value.map(x => x.fields));

//         } catch (error) {
            
//         }
//     };

//     const connectJIRABoard = async () => {
        
//         /*
        
//         // Your API endpoint
//         const baseUrl = `${process.env.REACT_APP_JIRA_BASE_URL}/2/issue/GB-2`;

        
//         const username = 'kandigaanusha@gmail.com';
//         const password = `ATATT3xFfGF0yvajgTkQsZW7lECBcyl0_NzWh4nUZUub-L3XrvM2oEM0q_0OFqZoHUDS88Qji0IlMMm7j0o34O7wDR4pbIp4Lgvl3gmrRCMOzv8Q9Rmc7TvGtNXmIXoEA7RyEQ4XwNuw3jqPq0dS7keTngR1hhzG-J4By8VAGYUH_GPLN7EBR0M=2DA7E95E`;

//         // Encode credentials to Base64
//         const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

//         const queryGetIssuesId = baseUrl;
        
//         try {
//             const response = await axios.get(queryGetIssuesId, {
//                 auth: {  
//                     username: `${username}`,  
//                     password:`${password}`  
//                   }  
//             });
//             console.log(response.data);
            
//             //setWorkItems(responseWorkItsm.data.value.map(x => x.fields));

//         } catch (error) {
//             console.log('error', error);
//         }

//         */
//         const password = `ATATT3xFfGF0yvajgTkQsZW7lECBcyl0_NzWh4nUZUub-L3XrvM2oEM0q_0OFqZoHUDS88Qji0IlMMm7j0o34O7wDR4pbIp4Lgvl3gmrRCMOzv8Q9Rmc7TvGtNXmIXoEA7RyEQ4XwNuw3jqPq0dS7keTngR1hhzG-J4By8VAGYUH_GPLN7EBR0M=2DA7E95E`;
//        let headers = {
//         'Authorization': `Basic ${
//           Buffer.from(`kandigaanusha@gmail.com:${password}`).toString('base64')
//         }`,
//         'Accept': 'application/json',
//       };
//         let headersList = {
//             "Accept": "*/*",            
//             "Authorization": `Bearer ${password}`
//            }
           
//            let response = await fetch("https://kandigaanusha.atlassian.net/rest/api/2/issue/GB-2", { 
//              method: "GET",
//              headers: headersList
//            });
           
//            let data = await response.data();
//            console.log(data);
//     };

//     const generateTestCases = async () => {
//         const url = `${process.env.REACT_APP_GEN_AI_BDD_TEST_GEN_PLUGIN}`;
//         // console.log('before', selectedStoryDesc);
//         // console.log('after', stripHtmlTags(selectedStoryDesc));
//         try {
//             const response = await axios.post(url, stripHtmlTags(selectedStoryDesc));
//             console.log(response.data);
//             setGeneratedTestCase(response.data);

//         } catch (error) {
//             console.log('Error-generateTestCases', error)
//         }
//     }

//     const stripHtmlTags = (input) => {
//         if (typeof input !== 'string') {
//           return input;
//         }
//         return input.replace(/<[^>]*>/g, '');
//       };

//     const handleTestCaseChange = (event) => {
//         setGeneratedTestCase(event.target.value);
//     }
      
//     return ( 
    
//     <div className="container">
//         <h3>Connect with DevOps/JIRA Board</h3>     
//         <div className="form-check">
//             <input type="radio" className="form-check-input" id="radAzDevOps" 
//                 name="optRad" value="azDevOps" onChange={onToolOptChange} checked={projectMgmtTool === "azDevOps"} />Azure Dev Ops
//         </div>
//         <div className="form-check">
//             <input type="radio" className="form-check-input" id="radJira" 
//                 name="optRad" value="jira" onChange={onToolOptChange} checked={projectMgmtTool === "jira"} />JIRA
//         </div>
//         <div>
//             <button type="button" onClick={connectAgileBoard} className="btn btn-secondary mt-3">Connect</button>
//         </div>
//         <div>            
//             <p className="font-weight-bold">Select User Story/Issue:</p>
//             <select className="form-select min-width-select" id="sel1" name="sellist1" onChange={handleChangeUserStory}>
//                 <option value="-1">Select user story/Issue</option>
//                 {workItems.map(wi => <option key={wi['System.Id']}  value={wi['System.Id']}>{wi['System.Title']}</option>)}
//             </select>
//             <br /> 
            
//             <p className="font-weight-bold">Project\Sprint: {selectedStoryIteration}</p>
//             <p className="font-weight-bold">Description:</p>
//             <div
//                 dangerouslySetInnerHTML={{__html: selectedStoryDesc}}
//             />
//             <br />
//             <button type="button" disabled={selectedStory === '-1'} onClick={generateTestCases} className="btn btn-secondary mt-3">Generate Test Cases</button>
//             <br />
//             <p className="font-weight-bold">Test Cases:</p>
            
//             <textarea className='text-white bg-dark' onChange={handleTestCaseChange} value={generatedTestCase} rows="30" cols="90">
            
//             </textarea> 
//             <br />
//             <DownloadFileComponent strData={generatedTestCase} disabled={generatedTestCase === ''} />
            
//         </div>
//     </div>   
        
//    );
// }

// export default BddGen;