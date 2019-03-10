import React, {Component} from 'react';

export default class ShowSearch extends Component{

    constructor(props){
        super(props);

        // Establish all bindings
        this.onChangeEmail           = this.onChangeEmail.bind(this);
        this.onShowDefault           = this.onShowDefault.bind(this);
        this.onChangeFormError       = this.onChangeFormError.bind(this);
        this.onSubmit                = this.onSubmit.bind(this);

        // Set the default state
        this.state={
            email:'',
            formError:'',
            fileEntries: []
        }
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
        //document.getElementById("email").focus();
    }

    validateUploadForm(){
        let isError = false;

        if(this.state.email.length === 0 || this.state.email.indexOf("@") === -1){
            isError = true;
            this.setState({
                formError:"Invalid email."
            });
            document.getElementById("email").focus();
        }

        return isError;
    }

    onSubmit(e){
        e.preventDefault();

        const err = this.validateUploadForm();
        if(!err){

            this.props.history.push('/search/' + this.state.email);
            
            // Clear Form  
            this.setState({
                email:'',
                formError:''
            });
        }// End if(!err)
    }

    render(){
        return(
            <div>
                <h3>Search Transcript List</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>EMail</label>
                        <input autoFocus type="text" 
                            name="email"
                            id = "email"
                            className="form-control" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail} 
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
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
    }// End render()

}// End ShowSearch