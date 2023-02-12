
import React, {useEffect, useState} from 'react';
import axios from 'axios';



function Form(props) {
    const [newInputQ, setNewInputQ] = useState(props.Q);

    return <form onSubmit={event =>{
        event.preventDefault();
        const originQ = event.target.originQ.value;
        axios.post('/request', 
                    {originQ: `${originQ}`}
                  )
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        props.onForm(originQ);
    }}>
                <p><input type="text" name="originQ" placeholder='originQ' value={newInputQ} onChange={
                    event => {
                        setNewInputQ(event.target.value);
                    }
                }></input></p>
                <p><input type="submit" value="번역"></input></p>
            </form>
}

function App() {
    const [test, setTest] = useState([]);
    const [bindingQ, setBindingQ] = useState('bindingQ'); 
    const [transQ, setTransQ] = useState('transQ');
    const [resultA, SetResultA] = useState('resultA');
    
    useEffect(() => {
        axios.get('/api/transQ')
        .then(response => setTransQ(JSON.stringify(response.data.message.result.translatedText).replace(/\"/gi, "")))
        .catch(error => console.log(error))
    }, [bindingQ]);

    useEffect(() => {
        axios.get('/apiTest')
        .then(response => {setTest(response.data)})
        .catch(error => console.log(error))
    }, [bindingQ]);
    

    return (
        <>
        <div>
        질문 입력<br/>    
            <Form Q={bindingQ} onForm={(_originQ) => {
                // console.log("2nd = " + _title);
                // setTitle(_title); < 이거 작동안함
                setBindingQ(_originQ);            
            }}></Form>
        </div>
        추천 질문<br/>
        {test.map((param, index) => (
        <input key={index} name="button" type="button" value={param} onClick={(event) => {   
                event.preventDefault();           
                axios.post('/request',
                {originQ: `What is the ${param}?`, originA: `What is the ${param}?`})
                .then(function (response) {
                    console.log(response);
                  })
                .catch(function (error) {
                    console.log(error);
                  });
                setBindingQ({param})}
        }/>))}
        <br/><br/>번역<br/>
        <form onSubmit={event => {
            const LocalTransQ = event.target.transQ.value;
            event.preventDefault();
            axios.post('/request',
                {originQ: `${LocalTransQ}`})
                .then(function (response) {
                    console.log(response);
                  })
                .catch(function (error) {
                    console.log(error);
                  });
                setBindingQ({LocalTransQ});
            axios.get('/api/sendQ')
            .then(response => SetResultA(JSON.stringify(response.data.choices[0].text).replace(/\"/gi, "")))
            .catch(error => console.log(error)) 
            setBindingQ(LocalTransQ);    
        }}>
            <p><input type="text" name="transQ" placeholder='transQ' value={transQ} onChange={
                    event => {
                        setTransQ(event.target.value);
                    }} /></p>                
            <p><input type="submit" value="ai에게 질문"></input></p>
        </form>
        <br/><br/>답변<br/>
        <form onSubmit={event => {
                    
        }}><input size="100" type="text" name="resulA" placeholder='resultA' value={resultA} onChange={
            event => {
                SetResultA(event.target.value);
            }} 
         /></form>   
        </>
    );
}

export default App;
