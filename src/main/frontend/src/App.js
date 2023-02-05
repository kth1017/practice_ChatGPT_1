//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//export default App;

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Form(props) {
    return <form onSubmit={event =>{
        const title = event.target.title.value;
        const content = event.target.content.value;
        props.onForm(title, content);
    }}>
                <p><input type="text" name="title" placeholder='title'></input></p>
                <p><textarea name='content' placeholder='content'></textarea></p>
                <p><input type="submit" value="create"></input></p>
            </form>
}

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (

        <div>
            <Form onForm={(title, content) => {
                axios.post('/request', {
                    title: "{title}",
                    content: "{content}"
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
            }}></Form>
            
                        백엔드에서 가져온 데이터입니다 : {hello}
        </div>
    );
}

export default App;
