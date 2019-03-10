import React, {Component} from 'react';

export default class ShowWelcome extends Component{

    render(){
        return(
            <div>
                <h3>MERN Stack Web Dev Practicum</h3>
                <p>This application will allow users the ability to upload/record speech/conversation of up to 60 minutes, translates the audio and sends a text transcript to th user's email upon completion.
                    <br /><strong>Upload Audio</strong> - Select this menu item to upload an existing audio file for translation.
                    <br /><strong>Create Audio</strong> - Select this menu item to record a live audio file for translation.
                    <br /><strong>Transcript List</strong> - Select this menu item to search old transcripts.
                </p>
            </div>
        );
    }
}
