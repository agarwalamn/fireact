import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDf8gylgvGgh3zN4h0A6saTJt43cwPI3TY",
    authDomain: "reactpractice-58fce.firebaseapp.com",
    databaseURL: "https://reactpractice-58fce.firebaseio.com",
    projectId: "reactpractice-58fce",
    storageBucket: "reactpractice-58fce.appspot.com",
    messagingSenderId: "622708865896",
    appId: "1:622708865896:web:d34bc01e626213d5"
};

function Username(props) {
        return(
            <div className="userHead">
                <h4><img src={props.dpUrl} alt="profile pic" /><span className="username">@{props.name}</span></h4>
            </div>
        )
}

 let Postimage =(props)=>{
    return(
    <div className="post">
            <p>{props.dis}</p>
        <img src={props.url} alt="post"/>
        
    </div>
    )
}
function Footer(props) {
    return (
        <div className="footer">
            <span><img src="like.png" />{props.like}</span> 
            <span><img src="retweet.png"/>{props.retweet}</span>
            <span><img src="share.png" />{props.share}</span>
        </div>
    )
}

export class App extends React.Component {
    constructor(){
        super();
        this.app = firebase.initializeApp(firebaseConfig);
        this.ref = this.app.database().ref();
        this.state={
            users:[],
        }   
    }
    componentDidMount(){
        this.ref.once('value',snap =>{
            snap.forEach(childSnapshot=>{
                this.setState({
                    users: this.state.users.concat(childSnapshot.val())
                })   
            })         
        })   
    }
  render() {
    return (
      <div>
            {
                this.state.users.map(user => {
                return (
                <div key={user.id} className="card">
                    <Username  name={user.username} dpUrl={user.dp}/>
                    <Postimage url={user.imageUrl} dis={user.postDis}/>  
                    <Footer like={user.likes} share={user.share} retweet={user.retweet}></Footer>
                </div>
                )
            })
            }
      </div>
    )
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));

