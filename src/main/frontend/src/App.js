
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Form(props) {
    return <form onSubmit={event =>{
        const title = event.target.title.value;
        const content = event.target.content.value;
        console.log("1st = " + title);
        props.onForm(title, content);
    }}>
                <p><input type="text" name="title" placeholder='title'></input></p>
                <p><textarea name='content' placeholder='content'></textarea></p>
                <p><input type="submit" value="create"></input></p>
            </form>
}

function App() {
    const [hello, setHello] = useState('')
    const [title, setTitle] = useState('')
    const [a, setA]  = useState('')

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);


    return (

        <div>
            <Form onForm={(_title, _content) => {
                // console.log("2nd = " + _title);
                // setTitle(_title); < 이거 작동안함
                console.log("3rd = " + title);
                

                axios.post('/request', 
                    {title: `${_title}`, content : "${content}"}
                  )

                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
            }}></Form>
            
            
                        백엔드에서 가져온 데이터입니다 : {hello} {a}
        </div>
    );
}

export default App;
