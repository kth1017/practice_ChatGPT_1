
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from '@mui/material'
import { ButtonGroup } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';




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
                <p><Input type="text" name="originQ" placeholder='한글로 질문을 입력해주세요' value={newInputQ} onChange={
                    event => {
                        setNewInputQ(event.target.value);
                    }
                } /></p>
                <p><Button variant="outlined" type="submit">번역</Button></p>
            </form>
}

function App() {
    const [test, setTest] = useState([]);
    const [bindingQ, setBindingQ] = useState('bindingQ'); 
    const [transQ, setTransQ] = useState('transQ');
    const [resultA, SetResultA] = useState('resultA');
    
    useEffect(() => {
        axios.get('/api/transQ')
        .then(response => setTransQ(JSON.stringify(response.data.message.result.translatedText).replace(/"/gi, "")))
        .catch(error => console.log(error))
    }, [bindingQ]);

    useEffect(() => {
        axios.get('/apiTest')
        .then(response => {setTest(response.data)})
        .catch(error => console.log(error))
    }, []);
    

    return (
        <>
        <Container>
         <br/><Button variant='contained'>Gpt Api 웹서비스</Button><br/><br/>
        </Container>
        <Container fixed>    
        <Grid Container>
            <Grid item xs={2}>   
            질문 입력<br/>    
                <Form Q={bindingQ} onForm={(_originQ) => {
                    // console.log("2nd = " + _title);
                    // setTitle(_title); < 이거 작동안함
                    setBindingQ(_originQ);            
                }}></Form>
            </Grid>
            <Grid item xs={10}> 
            추천 질문<br/><br/> 
            <ButtonGroup variant="outlined" aria-label="outlined button group">
            {test.map((param, index) => (
            <Button variant="outlined" key={index} value={param} onClick={(event) => {
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
            }>{param}</Button>))}
            </ButtonGroup></Grid>  
        </Grid>
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
            .then(response => SetResultA(JSON.stringify(response.data.choices[0].text).replace(/"/gi, "")))
            .catch(error => console.log(error)) 
            setBindingQ(LocalTransQ);    
        }}>
            <p><Input type="text" name="transQ" placeholder='transQ' value={transQ} onChange={
                    event => {
                        setTransQ(event.target.value);
                    }} /></p>                
            <p><Button variant='outlined' type="submit">ai에게 질문</Button></p>
        </form>
        <br/><br/>답변<br/><br/> 
            <TextField fullWidth multiline value={resultA} onChange={
            event => {
                SetResultA(event.target.value);
            }} >{resultA}</TextField>
        </Container>
        </>
    );
}

export default App;
