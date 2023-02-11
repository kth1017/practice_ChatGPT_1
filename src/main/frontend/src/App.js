
import React, {useEffect, useState} from 'react';
import axios from 'axios';



function Form(props) {
    const [newInputQ, setNewInputQ] = useState(props.Q);

    return <form onSubmit={event =>{
        event.preventDefault();
        const originQ = event.target.originQ.value;
        const originA = event.target.originA.value;
        props.onForm(originQ, originA);
    }}>
                <p><input type="text" name="originQ" placeholder='originQ' value={newInputQ} onChange={
                    event => {
                        setNewInputQ(event.target.value);
                    }
                }></input></p>
                <p><textarea name='originA' placeholder='originA'></textarea></p>
                <p><input type="submit" value="create"></input></p>
            </form>
}


function App() {
    const [hello, setHello] = useState('');
    const [test, setTest] = useState([]);
    const [bindingQ, setBindingQ] = useState('init'); 
    
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, [bindingQ]);

    useEffect(() => {
        axios.get('/apiTest')
        .then(response => {setTest(response.data)})
        .catch(error => console.log(error))
    }, []);
    

    return (
        <>
        <div>
            <Form Q={bindingQ} onForm={(_originQ, _originA) => {
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
                  });
                setBindingQ(_originQ);            
            }}></Form>
                                 백엔드에서 가져온 데이터입니다 : {hello}
        </div>
        {test.map((param) => (
        <input type="submit" value={param} />))}
        </>
    );
}

export default App;
