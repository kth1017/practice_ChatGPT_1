
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { Container, Grid, Button, ButtonGroup, Input, TextField, Typography } from '@mui/material'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import '@fontsource/roboto/700.css';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const ModContext = React.createContext();
function ModProvider({ children }) {
  const modState = useState(true);
  return <ModContext.Provider value={modState}>
         {children}
        </ModContext.Provider>;
}
function useModState() {
  const value = useContext(ModContext);
  if (value === undefined) {
    throw new Error('error')
        
    }   return value;
}

    function CustomDial(props){
        const [mod, setMod] = useModState();
        const Mfalse = () => setMod(false);
        return <Dialog open={mod}>
        <DialogTitle>사용법</DialogTitle>
            <DialogContent> 
                <DialogContentText>
                    1. ai에게 할 질문이 한글이라면 번역을 위한 한글 질문을 입력해주시거나 추천 질문 버튼을 눌러주세요.<br />
                    2. 번역된 질문 또는 직접 입력한 영어 질문이 'ai에게 질문하기' 버튼을 누르시면 아래에 답변이 출력됩니다.
                </DialogContentText>
                <DialogActions>
                    <Button variant='contained' onClick={Mfalse}>닫기</Button>
                </DialogActions>
            </DialogContent>
    </Dialog>
    }

    function DialButton(props){
        const [mod, setMod] = useModState();
        const Mtrue = () => setMod(true)
        return <Button variant='contained' onClick={Mtrue}>도움말 다시열기</Button>
    }


const FormContext = React.createContext();
function FormProvider({ children }) {
      const formState = useState(null);
      return <FormContext.Provider value={formState}>
             {children}
            </FormContext.Provider>;
    }
function useFormState() {
      const value = useContext(FormContext);
      if (value === undefined) {
        throw new Error('error')
            
        }   return value;
    }

function Form(props) {
    const [bindingQ, setBindingQ] = useFormState();
    return <form onSubmit={event =>{
        event.preventDefault();
        const originQ = event.target.originQ.value;
        axios.post('/request', 
                    {originQ: `${originQ}`})
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);});
        props.onForm(originQ);}}>
                <p><Input type="text" name="originQ" placeholder='한글로 질문을 입력해주세요' value={bindingQ||""} onChange=
                {event => {setBindingQ(event.target.value)}} /></p>
                <p><Button variant="outlined" type="submit">번역</Button></p>
            </form>         
}

function ButtonForm(props) {
    const qArr = props.qArr;
    const grouping = () => {
        const result = [];
        for (let i=0;i<qArr.length;i++) {
            result.push(<Button variant="outlined" key={qArr[i]} value={qArr[i]} onClick={(event) => {                    
                        event.preventDefault();           
                        axios.post('/request',
                            {originQ: `What is the ${qArr[i]}?`, originA: `What is the ${qArr[i]}?`})
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        props.postQ(`What is the ${qArr[i]}?`);
                        }}>{qArr[i]}</Button>)}

                        
         return result;
         
    }
    return grouping();   
}

function App() {
    const [bindingQ, setBindingQ] = useState(null);
    const [transQ, setTransQ] = useState(null);
    const [resultA, setResultA] = useState(null);
    const [qArr, setQArr] = useState([]);

    useEffect(() => {
        axios.get('/apiTest')
        .then(response => setQArr(response.data))               
        .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        axios.get('/api/transQ')
        .then(response => {setTransQ(JSON.stringify(response.data.message.result.translatedText).replace(/"/gi, ""));
                            })
        .catch(error => console.log(error))
        console.log(`번역 get tq = ${transQ}, 시작시 bq = ${bindingQ}`);
    }, [bindingQ]);

    return (
        <>
        <ModProvider>
            <Container>
                <CustomDial></CustomDial><br/>
                    <QuestionAnswerIcon></QuestionAnswerIcon>
                    <Typography variant="h4" component="h2">gpt api를 이용한 프로그래밍 질문 웹서비스</Typography>
                <br/>  
                <Container>  
                    <ButtonGroup>
                        <DialButton></DialButton>
                    </ButtonGroup><br/><br/>  
                </Container>
                <Container fixed> 
                    <Container sx={{ border: 1, padding:2, borderColor: 'divider' }}>
                    <Grid Container>
                        <Grid item xs={2}>   
                        질문 입력<br/>    
                        <FormProvider><Form onForm={(_originQ) => {setBindingQ(_originQ);}}></Form></FormProvider>
                        </Grid>
                        <Grid item xs={10}> 
                        추천 질문<br/><br/> 
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <ButtonForm qArr={qArr} postQ={(Q) => {setBindingQ(Q)}}></ButtonForm>
                        </ButtonGroup></Grid>  
                    </Grid>
                    </Container>
                    <br/>
                    <Container sx={{ border: 1, padding:2, borderColor: 'divider' }}>     
                    <br/>번역<br/>
                    <form onSubmit={event => {
                        const LocalTransQ = event.target.transQ.value;
                            event.preventDefault();
                            axios.post('/request',
                                {originQ: `${LocalTransQ}`})
                                .then(function (response) {
                                    console.log(response);
                                    axios.get('/api/sendQ')
                                        .then(response => setResultA(JSON.stringify(response.data.choices[0].text).slice(5,-1).replace(/\\n/gi,'\n')))
                                        .catch(error => console.log(error));
                                        setTransQ(LocalTransQ);
                                })
                                .catch(error => {console.log(error)});        
                            }}>
                            <p><Input required type="text" name="transQ" placeholder='영어로 직접 입력 가능' value={transQ||''} onChange={
                                    event => {setTransQ(event.target.value);}} /></p>                
                            <p><Button variant='outlined' type="submit">ai에게 질문</Button></p>
                    </form>
                    </Container>
                    <br/>
                    <Container sx={{ border: 1, padding:2, borderColor: 'divider' }}>    
                    <br/>답변<br/><br/> 
                        <TextField fullWidth multiline value={resultA||''} onChange={event => {setResultA(event.target.value);}}>{resultA}</TextField>
                    </Container>    
                </Container>
            </Container>
        </ModProvider>
        </>
        );
}

export default App;
