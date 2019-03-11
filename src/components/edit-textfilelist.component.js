import React, {Component} from 'react';
import axios from 'axios';

export default class EditTextFileList extends Component{
    constructor(props){
        super(props);

        // Establish all bindings
        this.onShowList              = this.onShowList.bind(this);

        this.state={
            file_name: '',
            file_description:'',
            file_email:'',
            file_data:''
        }
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

    render(){
        return(
            <div>
                <h3>View Transcription</h3>
                <form >
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Transcripton: </label>
                        <textarea
                            rows="10"
                            className="form-control"
                            readOnly="readOnly"
                            value={this.state.file_data}
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