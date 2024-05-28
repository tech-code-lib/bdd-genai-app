import axios from 'axios';
import {Buffer} from 'buffer';
import React, { useState } from 'react';

import DownloadFileComponent from './DownloadFileComponent';


function BddGen() {
    const [projectMgmtTool, setProjectMgmtTool] = useState("azDevOps")
    const [workItems, setWorkItems] = useState([]);
    const [selectedStory, setSelectedStory] = useState('-1');
    const [selectedStoryDesc, setSelectedStoryDesc] = useState('');
    const [selectedStoryIteration, setselectedStoryIteration] = useState('');
    const [generatedTestCase, setGeneratedTestCase] = useState('');
    const onToolOptChange = (e) => {
        setProjectMgmtTool(e.target.value)
    }
    const handleChangeUserStory = (event) => {
        setSelectedStory(event.target.value);
        if(event.target.value != "-1")
        {
            let wi = workItems.find(x => x.id == event.target.value);
            setSelectedStoryDesc(wi.description);
            setselectedStoryIteration(wi.iteration)
        }
        else
        {
            setSelectedStoryDesc('');
            setselectedStoryIteration('');
        }
        setGeneratedTestCase('');
    };

    
    const connectAgileBoard = async () => {
        setWorkItems([]);
        setGeneratedTestCase('');
        setSelectedStory('-1');
        setSelectedStoryDesc('');
        setselectedStoryIteration('');
        const config = {
            headers: {
              'Ocp-Apim-Subscription-Key': `${process.env.REACT_APP_AGILE_BOARD_KEY}` // Replace with your actual header name and value
            }
          };

        const agileBoardAPIUrl = `${process.env.REACT_APP_AGILE_BOARD_API}?name=${projectMgmtTool}`
        try {            
            const responseWorkItsm = await axios.get(agileBoardAPIUrl, config);
            
            setWorkItems(responseWorkItsm.data);

        } catch (error) {
            
        }
    }
    
    const generateTestCases = async () => {
        const url = `${process.env.REACT_APP_GEN_AI_BDD_TEST_GEN_PLUGIN}`;        
        try {
            const response = await axios.post(url, stripHtmlTags(selectedStoryDesc));
            console.log(response.data);
            setGeneratedTestCase(response.data);

        } catch (error) {
            console.log('Error-generateTestCases', error)
        }
    }

    const stripHtmlTags = (input) => {
        if (typeof input !== 'string') {
          return input;
        }
        return input.replace(/<[^>]*>/g, '');
      };

    const handleTestCaseChange = (event) => {
        setGeneratedTestCase(event.target.value);
    }
      
    return ( 
    
    <div className="container">
        <h3>Connect with DevOps/JIRA Board</h3>     
        <div className="form-check">
            <input type="radio" className="form-check-input" id="radAzDevOps" 
                name="optRad" value="azDevOps" onChange={onToolOptChange} checked={projectMgmtTool === "azDevOps"} />Azure Dev Ops
        </div>
        <div className="form-check">
            <input type="radio" className="form-check-input" id="radJira" 
                name="optRad" value="JIRA" onChange={onToolOptChange} checked={projectMgmtTool === "JIRA"} />JIRA
        </div>
        <div>
            <button type="button" onClick={connectAgileBoard} className="btn btn-secondary mt-3">Connect</button>
        </div>
        <div>            
            <p className="font-weight-bold">Select User Story/Issue:</p>
            <select className="form-select min-width-select" id="sel1" name="sellist1" onChange={handleChangeUserStory}>
                <option value="-1">Select user story/Issue</option>
                {workItems.map(wi => <option key={wi.id}  value={wi.id}>{wi.title}</option>)}
            </select>
            <br /> 
            
            <p className="font-weight-bold">Project\Sprint: {selectedStoryIteration}</p>
            <p className="font-weight-bold">Description:</p>
            <div
                dangerouslySetInnerHTML={{__html: selectedStoryDesc}}
            />
            <br />
            <button type="button" disabled={selectedStory === '-1'} onClick={generateTestCases} className="btn btn-secondary mt-3">Generate Test Cases</button>
            <br />
            <p className="font-weight-bold">Test Cases:</p>
            
            <textarea className='text-white bg-dark' onChange={handleTestCaseChange} value={generatedTestCase} rows="30" cols="90">
            
            </textarea> 
            <br />
            <DownloadFileComponent strData={generatedTestCase} disabled={generatedTestCase === ''} />
            
        </div>
    </div>   
        
   );
}

export default BddGen;