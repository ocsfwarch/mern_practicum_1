import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

let finalTranscripts = [];
let tempInterval = 0;
export default class CreateAudioFile extends Component{

    constructor(props){
        super(props);

        // Establish all bindings
        this.onStartRecording        = this.onStartRecording.bind(this);
        this.onStopRecording         = this.onStopRecording.bind(this);
        this.onChangeFileName        = this.onChangeFileName.bind(this);
        this.onChangeFileDescription = this.onChangeFileDescription.bind(this);
        this.onChangeEmail           = this.onChangeEmail.bind(this);
        this.onSubmit                = this.onSubmit.bind(this);
        this.onShowDefault           = this.onShowDefault.bind(this);
        this.onChangeFormError       = this.onChangeFormError.bind(this);

        // Set the default state
        this.state={
            file_name: '',
            file_description:'',
            email:'',
            final_transcript:[],
            minutes:0,
            seconds:0,
            output:'',
            recognizing:false,
            formError:'',
            startRecordDis:true,
            stopRecordDis:true,
            saveRecordDis:true        
        }

        // Create the input element references
        this.filenameInput        = React.createRef();
        this.fileDescriptionInput = React.createRef();
        this.emailInput           = React.createRef();
    }

    onChangeFileName(e){
        this.setState({
            file_name: e.target.value
            }
        )
    }

    onChangeFileDescription(e){
        this.setState({
            file_description: e.target.value
            }
        )
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
            }
        )
    }

    onShowDefault(){
        this.props.history.push('/');
    }

    onChangeFormError(e){
        this.setState({
            formError: e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            startRecordDis:false,
            stopRecordDis:true,
            saveRecordDis:true        
        });
    }

    onStartRecording(){
        if(this.testSpeechCapabilities()){
            this.setState({
                final_transcript:[],
            });
            this.initDictation(this.state.final_transcript, true);
        }

        this.setState({
            startRecordDis:true,
            stopRecordDis:false,
            minutes:0,
            seconds:0,
            output:'00:00',
        });
        tempInterval = setInterval(this.showProgress.bind(this),1000);
        return false;
    }

    onStopRecording(){
        this.setState({
            stopRecordDis:true,
            saveRecordDis:false        
        });
        this.initDictation(null, false);
        clearInterval(tempInterval);
        return false;
    }

    initDictation(arrayTranscripts, bEnable){
        const final_transcript = [];
        const recognition = new window.webkitSpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        if(bEnable){
            recognition.start();
        }else{
            recognition.stop();
        }
    
        recognition.onerror = function(event) {
            //console.log(event.error);
        };
        
        recognition.onresult = function(event) {
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final_transcript.push(event.results[i][0].transcript);
                    finalTranscripts = final_transcript;
                } else {
                    // Do nothing with the interim results
                }
            }// End for()
        };
    }// End initDictation

    onSubmit(e){
        e.preventDefault();
        const err = this.validateUploadForm();
        if(!err){
            this.setState({
                startRecordDis:false,
                stopRecordDis:true,
                saveRecordDis:true        
            });
    
            const newFileItem = {
                file_name: this.state.file_name,
                file_description : this.state.file_description,
                email: this.state.email,
                transcribe:false
            }

            const fileToUpload = new File(finalTranscripts, this.state.file_name);

            const strUrl = "http://localhost:4000/mern1/saveFile";
            const formData = new FormData();
            formData.append('fileitem', fileToUpload);
            formData.append('model', JSON.stringify(newFileItem));
            
            const config = {
                headers:{
                'content-type':'multipart/form-data'
                }
            }
            axios.post(strUrl, formData, config)
            .then(res => this.setState({formError:res.data}));
            
            // Clear Form  
            this.setState({
                file_name: '',
                file_description:'',
                email:'',
                formError:''
            });

        }
    }// End onSubmit

    validateUploadForm(){
        let isError = false;
 
        if(this.state.file_name.length === 0 ){
            isError = true;
            this.setState({
                formError:"Invalid file name."
            });
            this.filenameInput.current.focus();
        }else if(this.state.file_description.length < 5){
            isError = true;
            this.setState({
                formError:"Invalid file description."
            });
            this.fileDescriptionInput.current.focus();
        }else if(this.state.email.length === 0 || this.state.email.indexOf("@") === -1){
            isError = true;
            this.setState({
                formError:"Invalid email."
            });
            this.emailInput.current.focus();
        }

        return isError;
    }

    testSpeechCapabilities(){
        let bReturn = false;
        if(window.hasOwnProperty('webkitSpeechRecognition')){
            bReturn = true;
        }else{
            if(window.hasOwnProperty('SpeechRecognition')){
                bReturn = true;
            }else{
                alert("Has No Speech Capabilities");
            }
        }
        return bReturn;
    }

    showProgress(){
        let tempMinutes = this.state.minutes;
        let tempSeconds = this.state.seconds;
        if(tempSeconds <= 59){
            tempSeconds++;
        }
        
        if(tempSeconds === 60){
            tempMinutes++;
            if(tempMinutes < 60){
                tempSeconds = 0;
                this.updateElapsedTimeDisplay(tempMinutes, tempSeconds);
            }else{
                tempSeconds = 0;
                this.updateElapsedTimeDisplay(tempMinutes, tempSeconds);
                this.onStopRecording();
                return false;
            }
        }else{
            this.updateElapsedTimeDisplay(tempMinutes, tempSeconds);
        }


        return false;
    }

    updateElapsedTimeDisplay(nMinutes, nSeconds){
        let strMinutes = "";
        let strSeconds = "";

        if(nMinutes < 10){
            strMinutes = "0" + nMinutes;
        }else{
            strMinutes = nMinutes;
        }

        if(nSeconds < 10){
            strSeconds = "0" + nSeconds
        }else{
            strSeconds = nSeconds;
        }
        const strOutput = strMinutes+":"+strSeconds;

        this.setState({
            minutes:nMinutes,
            seconds:nSeconds,
            output:strOutput
        });
    }

    render(){
        return(
            <div>
                <h3>Create Audio File</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>File Name</label>
                        <input autoFocus type="text" 
                            name="file_name"
                            id = "file_name"
                            className="form-control" 
                            value={this.state.file_name} 
                            ref={this.filenameInput}
                            onChange={this.onChangeFileName} 
                        />
                    </div>
                    <div className="form-group">
                        <label>File Description</label>
                        <input type="text"
                            name="file_description"
                            id = "file_description"
                            className="form-control" 
                            value={this.state.file_description} 
                            ref={this.fileDescriptionInput}
                            onChange={this.onChangeFileDescription} 
                        />
                    </div>
                    <div className="form-group">
                        <label>EMail</label>
                        <input type="text" 
                            name="email"
                            id = "email"
                            className="form-control" 
                            value={this.state.email} 
                            ref={this.emailInput}
                            onChange={this.onChangeEmail} 
                        />
                    </div>
                    <div className="form-group">
                        <input type="button" 
                            id="startRecord"
                            value="Start Recording" 
                            className="btn btn-success" 
                            disabled={this.state.startRecordDis}
                            onClick={this.onStartRecording}
                            />&nbsp;
                        <input type="button" 
                            id="stopRecord"
                            value="Stop Recording"  
                            className="btn btn-danger" 
                            disabled={this.state.stopRecordDis}
                            onClick={this.onStopRecording}
                            />&nbsp;
                        <input type="submit" 
                            id="saveRecord"
                            value="Upload" 
                            disabled={this.state.saveRecordDis}
                            className="btn btn-primary" />
                        &nbsp;
                        <input type="button" 
                            value="Close" 
                            className="btn btn-primary"
                            onClick={this.onShowDefault} 
                            />
                    </div>
                    <div className="form-group">
                        Elapsed Time: <input type="text" 
                                id="timer" 
                                readOnly="readOnly"
                                value={this.state.output} 
                                />
                    </div>
                    <div className="form-group">
                        <label>Results</label>
                        <input type="text" 
                            name="formError"
                            id = "formError"
                            className="form-control" 
                            readOnly="readOnly"
                            value={this.state.formError} 
                        />
                    </div>
               </form>
            </div>
        );
    }
}