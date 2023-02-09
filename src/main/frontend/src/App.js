
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Form(props) {
    return <form onSubmit={event =>{
        const originQ = event.target.originQ.value;
        const originA = event.target.originA.value;
        props.onForm(originQ, originA);
    }}>
                <p><input type="text" name="originQ" placeholder='originQ'></input></p>
                <p><textarea name='originA' placeholder='originA'></textarea></p>
                <p><input type="submit" value="create"></input></p>
            </form>
}

function Form2(props) {
    return <form onSubmit={()=> {
        props.onForm2();
    }}>
        <p><input type="submit" value="create"></input></p>
    </form>
}

function App() {
    const [hello, setHello] = useState('');
    const [data, setData] = useState('');

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
            <Form2 onForm2={() => {
                axios.post("/papago/n2mt", 
                {
                    source: 'ko',
                    target: 'en',
                    text: '반갑습니다',
                }, {
                
                        baseURL: 'https://openapi.naver.com/v1/',
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'x-naver-client-id': "Gq8U7FfphGubx99OjBXA",
                            'x-naver-client-secret': "02aXTtkjy2",
                        },
                   }
              )

              .then(function (response) {
                setData(response);
              })
              .catch(function (error) {
                console.log(error);
              })

            }
            }></Form2>
            
                        백엔드에서 가져온 데이터입니다 : {hello} {data}



        </div>
    );
}

export default App;
