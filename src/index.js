import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx",
    databaseURL: "xxx",
    projectId: "xxxxx",
    storageBucket: "xxxx",
    messagingSenderId: "6xxxx",
    appId: "xxxxx"
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

