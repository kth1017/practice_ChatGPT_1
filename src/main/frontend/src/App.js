
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Form(props) {
    const [newinputQ, setNewinputQ] = useState("null");

    return <form onSubmit={event =>{
        const originQ = event.target.originQ.value;
        const originA = event.target.originA.value;
        props.onForm(originQ, originA);
    }}>
                <p><input type="text" name="originQ" placeholder='originQ' value={newinputQ} onChange={
                    event => {
                        setNewinputQ(event.target.value);
                    }
                }></input></p>
                <p><textarea name='originA' placeholder='originA'></textarea></p>
                <p><input type="submit" value="create"></input></p>
            </form>
}


function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);


    return (

        <div>
            <Form onForm={(_originQ, _originA) => {
                // console.log("2nd = " + _title);
                // setTitle(_title); < 이거 작동안함
                axios.post('/request', 
                    {originQ: `${_originQ}`, originA: `${_originA}`}
                  )

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
