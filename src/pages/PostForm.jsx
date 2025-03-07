import axios from 'axios';
import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PostForm(props) {
    //javascript로 page이동을 하기 위한 hook
    const navigate = useNavigate();

    return (
        <>
            <h1>새 post 작성폼</h1>
            <Form action="/posts" method="post" onSubmit={(e)=>{
                e.preventDefault();
                const url=e.target.action;
                //폼에 입력한 내용을 이용해서 FormData객체를 생성한다.
                const formData=new FormData(e.target);
                //폼에 입력한 내용이 object에 담긴다. 폼의 name이 키값 이런형태의 오브젝트임{name:"xxx", author:"yyy"}
                const obj=Object.fromEntries(formData);
                //axios를 이용해서 post방식으로 전송한다.
                axios.post(url, obj)
                .then(res=>{
                    //저장된 글 정보가 응답된다.
                    console.log(res.data);
                    alert(res.data.id+"번 글로 저장되었습니다.")
                    // "/posts"로 이동
                    navigate("/posts")
                })
                .catch(err=>console.log(err));
            }}>
                <FloatingLabel label="제목" className="mb-2" controlId="title">
                    <Form.Control type="text" name="title" placeholder="제목 입력..."/>
                </FloatingLabel>
                <FloatingLabel label="작성자" className="mb-2" controlId="author">
                    <Form.Control type="text" name="author" placeholder="제목 입력..."/>
                </FloatingLabel>
                <Button type="submit" variant="success">저장</Button>
            </Form>

            <form action="/posts" method="post" onSubmit={(e)=>{
                e.preventDefault();
                const url=e.target.action;
                //폼에 입력한 내용을 이용해서 FormData객체를 생성한다.
                const formData=new FormData(e.target);
                //폼에 입력한 내용이 object에 담긴다. 폼의 name이 키값 이런형태의 오브젝트임{name:"xxx", author:"yyy"}
                const obj=Object.fromEntries(formData);
                //axios를 이용해서 post방식으로 전송한다.
                axios.post(url, obj)
                .then(res=>{
                    //저장된 글 정보가 응답된다.
                    console.log(res.data);
                    alert(res.data.id+"번 글로 저장되었습니다.")
                    // "/posts"로 이동
                    navigate("/posts")
                })
                .catch(err=>console.log(err));
            }}>
                <div>
                    <label htmlFor="title">제목</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="author">작성자</label>
                    <input type="text" id="author" name="author" />
                </div>
                <button type="submit">저장</button>
            </form>
        </>
    );
}

export default PostForm;