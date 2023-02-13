
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from '@mui/material'
import { Input, TextField } from '@mui/material';
import { Container, Grid } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function Form(props) {
    const [newInputQ, setNewInputQ] = useState(null);

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

function CustomDial(props){
    const [mod, setMod] = useState(props.Mod);
    return <Dialog open={mod}>
    <DialogTitle>사용법</DialogTitle>
    <DialogContent> 
        <DialogContentText>
            1. ai에게 할 질문이 한글이라면 번역을 위한 한글 질문을 입력해주시거나 추천 질문 버튼을 눌러주세요.
            2. 번역된 질문 또는 직접 입력한 영어 질문이 'ai에게 질문하기' 버튼을 누르시면 아래에 답변이 출력됩니다.
        </DialogContentText>
        <DialogActions>
            <Button variant='contained' onClick={(event) => console.log(event)}>닫기</Button>
        </DialogActions>
    </DialogContent>
</Dialog>
}

function App() {
    const [test, setTest] = useState([]);
    const [bindingQ, setBindingQ] = useState('bindingQ'); 
    const [transQ, setTransQ] = useState(null);
    const [resultA, SetResultA] = useState(null);
    const [dialMod, setDialMod] = useState(false);

    
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
    
    useEffect(() => {
        axios.get('/api/sendQ')
        .then(response => SetResultA(JSON.stringify(response.data.choices[0].text).replace(/"/gi, "")))
        .catch(error => console.log(error)) 
    }, [resultA]);

    return (
        <>
        <CustomDial Mod={dialMod}></CustomDial>
        <span>Gpt api 웹사이트</span><br/>  <br/>  
        <Container>  
            <ButtonGroup>
                <Button variant='contained' onClick={() => {}}>초기화</Button>
                <Button variant='outlined' onClick={() => {}}>도움말 다시열기</Button>
            </ButtonGroup><br/><br/>  
        </Container>
        <Container fixed> 
            <Container>
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
            </Container>
            <br/><hr /> 
            <Container>    
            <br/>번역<br/>
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
                
                setBindingQ(LocalTransQ);    
            }}>
                <p><Input type="text" name="transQ" placeholder='영어로 직접 입력 가능' value={transQ} onChange={
                        event => {
                            setTransQ(event.target.value);
                        }} /></p>                
                <p><Button variant='outlined' type="submit">ai에게 질문</Button></p>
            </form>
            </Container> 
            <br/><hr />
            <Container>    
            <br/>답변<br/><br/> 
                <TextField rows="2" fullWidth multiline value={resultA} onChange={
                event => {
                    SetResultA(event.target.value);
                }} >{resultA}</TextField>
            </Container>    
        </Container>
        </>
    );
}

export default App;
