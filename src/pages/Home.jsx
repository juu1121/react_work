// src/pages/Home.jsx

import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Markdown from 'react-markdown';

function Home(props) {
    

    return (
        <div>
            <h1>인덱스 페이지 입니다.</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res=>{
                    alert(res.data);
                })
                .catch(error=>{
                    alert("응답하지 않음");
                });
            }}>Ping 요청 해보기</button>

            <Quiz />

        </div>
    );
}

function Quiz(){
    let quiz = "콘솔창에 1~10 까지 순서대로 출력하는 code를 javascript 로 작성해 보세요";
    
    const inputAnswer = useRef();

    const handleSubmit = ()=>{
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz", {
            quiz,
            answer:inputAnswer.current.value
        })
        .then(res=>{
            // res.data는 이런 모양의 object이다. 
            // {isCorrect:true or false, comment:"마크다운"}
            console.log(res.data);
            setState({
                ...state,
                ...res.data,
                isAnswered:true
            });
        })
        .catch(error=>console.log(error));
    }

    const [state, setState] = useState({
        isAnswered:false,
        isCorrect:false
    });
    return (
        <>
            {state.isAnswered ?
                <div>
                    <h3>체점 결과</h3>
                    { state.isCorrect ?
                        <Alert variant='success'>축하합니다. 정답입니다.</Alert>
                        :
                        <Alert variant='danger'>오답입니다.</Alert>
                    }
                    <h4>마크다운사용</h4>
                    <Markdown>{state.comment}</Markdown>
                    <h4>div사용용</h4>
                    <div>{state.comment}</div>

                    <Button variant='warning' className='me-3'> &larr; 다시 풀기</Button>
                    <Button variant='success'>다음문제 &rarr; </Button>
                </div>
            :
                <div>
                    <Form.Group className='mb-3'>
                        <Form.Label>{quiz}</Form.Label>
                        <Form.Control ref={inputAnswer} as="textarea" rows="10"></Form.Control>
                    </Form.Group>
                    <Button onClick={handleSubmit}>제출</Button>
                </div>
            }

        </>
    )
}

export default Home;