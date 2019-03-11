# OcsaPrac1/mern1_app


Project Overview:  
This is a practium for the MERN stack, the goal is to build a full stack Javascript (MERN) application that allows users to upload/record speech/conversation of up to 60 minutes, translates the audio, and sends a text transcript to the user's email upon completion. This application will also allow a user to see archived text transcripts and includes frontend and backend test coverage.  

This application is composed of 2 main components: Front-end Web GUI (mern1_app) and Back-end Web Server (mern1_server). Communication between the front-end and back-end elemenets is structured and performed in a RESTful manner. The front-end will make requests to the back-end using http url command requests and json formatted parameters. The back-end will respond to these requests with json formatted data. Back-end serialization of data will be achieved using a NoSQL (MongoDB) database and local storage.  

Overview - mern1_app:  
This application is based on the React Javascript library. All user interaction pages are based on components using JSX. All components have an associated Jest test. User access of the interaction functionality of this application is through the top-level menu. Bootstrap styling is also used in the GUI. The main purpose of the GUI is to allow a user to transcribe audio input to text output.  

There are 2 methods for transcribing audio input to text output: 1) Upload an audio/voice file using this application and 2) Create a live audio/voice input using the browser. For method 1, there are no restrictions if the audio/voice file has a valid format. For method 2 there is a restriction that the Chrome browser is required. This is due to the Chrome browser support having superior support for the Web Speech API compared to other browsers.  

This application also allows a user to view previous transcriptions. In this case, the user can enter the email address of any previous transcription. The system will retrieve all transcriptions associated with that email address. The transcription information will be displayed in a table and the user can select individual transcriptions for viewing.  

Use Case 1 - Upload an audio/voice file:  
This use case starts when the User selects the "Upload Audio" menu selection.  
The System displays the "CreateUploadEntry" component for "Upload Audio File".  
The User selects the "Select File" command button.  
The System displays a list of files available on the User device.  
The User selects an available audio file.  
The System displays the selected file name.  
The User enters a description for the file in the "File Description" input area.  
The User enters a valid email address in the "EMail" input area.  
The User selects the "Upload" command button.  
The System verifies the User has entered all the required information.  
The System displays an error message if there is missing or mis-formatted information.  
The System formats the data for transmission and sends a url to the server.  
The System displays the request results in the "Results" text field.  
This use case ends when the User selects the "Close" command button.  

Use Case 2 - Create a live audio/voice input:  
This use case starts when the User select the "Create Audio" menu selection.  
The System displays the "CreateAudioFile" component for "Create Audio File".  
The User enters a file name in the "File Name" input area.  
The User enters a description for the file in the "File Description" input area.  
The User enters a valid email address in the "EMail" input area.  
The User selects the "Start Recording" command button.  
The System verifies the browser supports Web Speech.  
The System starts recording the User audio through the microphone.  
The System displays the elapsed time of the recording.  
The User selects the "Stop Recording" command button.  
The System stops recordig the User audio through the microphone.  
The System stops the elapsed time of the recording.  
The User selects the "Upload" command button.  
The System verifies the User has entered all the required information.  
The System displays an error message if there is missing or mis-formatted information.  
The System formats the data for transmission and sends a url to the server.  
The System displays the request results in the "Results" text field.  
This use case ends when the User selects the "Close" command button.  

Use Case 3 - view previous transcriptions  
This use case starts when the User select the "Transcript List" menu selection.  
The System displays the "ShowSearch" component for "Search Transcript List".  
The User enters a valid email address in the "EMail" input area.  
The System verifies the User has entered all the required information.  
The System displays an error message if there is missing or mis-formatted information.  
The System formats the data for transmission and sends a url to the server.  
The System displays the request results in the "Audio to Text List" table display.  
The User selects the "View" link for a particular transcription.  
The System displays "View Transcription" component.  
The User selects the "Close" command button from the "View Transcription" component.  
The System displays the "Audio to Text List" table display.  
This use case ends when the User selects the "Close" command button.  

Testing:  
Jest is used as the GUI testing framework. This was selected due to it's level of integration with React as well as it's ease of use. This application uses the snapshot functionality of Jest to verify changes to the GUI are correct. It is also used to guard against inadvertent changes that might occur during development. Postman was used as the url testing framework. Postman allows us to verify all links available in the application.  

Development Environment:  
Microsoft Windows 7 VM  
Chrome v 72  
Microsoft Visual Studio Code
MongoDb  
Express  
React  
Node  

List of test tools:  
Jest  
Postman   
  
Information Links:  
W3C Web Speech API - https://w3c.github.io/speech-api/ 
React - https://reactjs.org
