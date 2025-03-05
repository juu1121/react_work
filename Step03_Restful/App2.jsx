import axios from "axios";
import { useEffect, useState } from "react";
/*
    fetch()함수 대신에 axios  사용해보기기
*/

function App(){

    //글 목록을 상태값으로 관리하기 위해 
    const [posts, setPosts] = useState([]); //초기값은 빈 배열열

    //글 목록 데이터를 받아오는 함수
    const refresh = ()=>{
        axios.get("/v1/posts")
        .then(res=>{
            //res object의 data라는 방에 서버가 응답한 데이터가 들어있다.
            setPosts(res.data);
        })
        .catch(error=>console.log(error));
    }
    /*
        useEffect(함수, 배열)
        여기 전달한 함수는 App 컴포넌트가 초기화 되는 시점에 1번 호출된다.
        배열을 비워두면 App 컴포넌넌트가 초기화되는시점에 최초 1번만 호출된다.
        비워두지않으면...즉, 어떤 state값을 넣어주면 해당 state가 변경될때마다 호출된다.
        => 이렇게 배열을 비워두면, 페이지가로딩되는시점에1번호출된다.
        => useState의 posts값을 배열에 넣어두면,  변경되는시점에도 호출된다다
    */
    useEffect(()=>{
        refresh();
    }, [])

    return (
        <div className="container">
            <h1>새글 작성 폼</h1>
            <form action="/v1/posts" onSubmit={(e)=>{
                e.preventDefault(); //폼 전송 막기
                //요청 url 읽어오기
                const url = e.target.action;
                //FormData객체 얻어오기
                const formData = new FormData(e.target);
                //폼에 입력한 내용을 object로 변환
                const obj = Object.fromEntries(formData);
                //object에 있는 내용을 이용해서 JSON문자열 만들어내기
                const json = JSON.stringify(obj);
                /* 
                    .post(요청경로, object)
                    - object에 담긴 내용이 자동으로 json문자열로 변경되어서 서버에 전달된다.
                */
                axios.post("/v1/posts", obj)
                .then(res=>{
                    //res는 object인데, 응답에 관련된 여러가지 정보가 들어 있다.
                    console.log(res);
                    //서버가 응답한 json문자열이 object 혹은 array로 변환되어서 res.data라는 방에 들어있다.
                    console.log(res.data);
                    refresh();
                    
                })
                .catch(error=>{
                    console.log(error);
                })
            }}>
                <input type="text" name="title" placeholder="제목입력..." />
                <input type="text" name ="author" placeholder="작성자입력..." />
                <button type="submit">저장</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td><button onClick={()=>{
                                //수정할 제목을 입력 받는다.
                                const title = prompt(item.id+"번 글의 수정할 제목 입력")
                                //수정할 정보를 이용해서 object만든다.
                                const obj={
                                    title:title,
                                    author:item.author
                                };
                                axios.put("/v1/posts/"+item.id, obj)
                                .then(res=>{
                                    console.log(res.data);
                                    refresh();
                                })
                                .catch(error=>console.log(error));
                             
                            }}>수정</button></td>
                            <td><button onClick={()=>{
                                 axios.delete("/v1/posts/"+item.id)
                                 .then(res=>{
                                    alert(res.data.id+"번 글을 삭제했습니다.");
                                    refresh();
                                 })
                                 .catch(error=>console.log(error));
                            }}>x</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App;