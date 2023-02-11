
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

function Button(props) {

    return <form onSubmit={event =>{
        event.preventDefault();
        props.onButton();
    }}><p><input type="submit" value="button" /></p>
     
    </form>
}


function App() {
    const [hello, setHello] = useState('');
    const [bindingq, setBindingQ] = useState('init');

    console.log("submit전 bindingq = " + bindingq);   

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, [bindingq]);

    useEffect(() => {
        
    }, [bindingq])

    return (

        <div>
            <Form Q={bindingq} onForm={(_originQ, _originA) => {
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
            <Button onButton={()=>{
                setBindingQ('button');
                console.log("버튼 누른 후 bindingQ = " + bindingq);
            }}></Button>        
        </div>
    );
}

export default App;
