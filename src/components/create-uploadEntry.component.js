import React, {Component} from 'react';

import axios from 'axios';

export default class CreateTextFileList extends Component{

    constructor(props){
        super(props);

        // Establish all bindings
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
            formError:''
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

    onChangeFormError(e){
        this.setState({
            formError: e.target.value
        })
    }

    onShowDefault(){
        this.props.history.push('/');
    }

    componentDidMount(){
        //document.getElementById("file_name").focus();
    }

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

    onSubmit(e){
        e.preventDefault();

        const err = this.validateUploadForm();
        if(!err){
            this.setState({
                formError: ""
            })
            
            //console.log("Form Submitted");
            //console.log(`File Name: ${this.state.file_name}`);
            //console.log(`File Name: ${this.state.file_description}`);

            const newFileItem = {
                file_description : this.state.file_description,
                email: this.state.email,
                transcribe:true
            }

            const strUrl = "http://localhost:4000/mern1/saveFile";
            const formData = new FormData();
            formData.append('fileitem', document.querySelector('input[type="file"]').files[0]);
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
    }

    render(){
        return(
            <div>
                <h3>Upload Audio File</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>File Name</label>
                        <input autoFocus type="file" 
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
                        <input type="submit" value="Upload" className="btn btn-primary" />
                        &nbsp;
                        <input type="button" 
                            value="Close" 
                            className="btn btn-primary"
                            onClick={this.onShowDefault} 
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