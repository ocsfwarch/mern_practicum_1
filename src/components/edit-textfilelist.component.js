import React, {Component} from 'react';
import axios from 'axios';

export default class EditTextFileList extends Component{
    constructor(props){
        super(props);

        // Establish all bindings
        this.onChangeFileName        = this.onChangeFileName.bind(this);
        this.onChangeFileDescription = this.onChangeFileDescription.bind(this);
        this.onChangeEmail           = this.onChangeEmail.bind(this);
        this.onSubmit                = this.onSubmit.bind(this);
        this.onShowList              = this.onShowList.bind(this);
        this.onChangeTranscripton    = this.onChangeTranscripton.bind(this);

        this.state={
            file_name: '',
            file_description:'',
            file_email:'',
            file_data:''
        }
    }

    // Set the default state
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
            email_name: e.target.value
            }
        )
    }

    onChangeTranscripton(e){
        this.setState({
            file_data: e.target.value
            }
        )
    }

    onShowList(){
        this.props.history.push('/search/'+this.state.file_email);
   }

   componentDidMount(){
       axios.get('http://localhost:4000/mern1/'+this.props.match.params.id)
           .then(response => {
               //alert(response.data.file_data);
               this.setState({
                   file_name: response.data.file_name,
                   file_description: response.data.file_description,
                   file_email: response.data.file_email,
                   file_data: response.data.file_data
               });
           })
           .catch(function(error){
               console.log(error);
           });
   }

   onSubmit(e){
        e.preventDefault();

        console.log("Form Submitted");
        console.log(`File Name: ${this.state.file_name}`);
        console.log(`File Name: ${this.state.file_description}`);

        const newFileItem = {
            file_name : this.state.file_name,
            file_description : this.state.file_description
        }

        axios.post('http://localhost:4000/mern1/update/'+this.props.match.params.id, newFileItem)
            .then(res => console.log(res.data));

        // Now go back to the complete list of entries
        this.onShowList();          
    }

    render(){
        return(
            <div>
                <h3>View Transcription</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_name}
                            onChange={this.onChangeFileName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_description}
                            onChange={this.onChangeFileDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Transcripton: </label>
                        <textarea
                            rows="10"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_data}
                            onChange={this.onChangeTranscripton}
                        />
                    </div>
                    <div className="form-group">
                        <input type="button" 
                            value="Close" 
                            className="btn btn-primary"
                            onClick={this.onShowList} />
                    </div>
                </form>
            </div>
        );
    }
}