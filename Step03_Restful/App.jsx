import { useEffect, useState } from "react";



function App(){
    //글 목록을 상태값으로 관리하기 위해 
    const [posts, setPosts] = useState([]); //초기값은 빈 배열열

    //글 목록 데이터를 받아오는 함수
    const refresh = ()=>{
        //GET방식 /posts 요청하기
        fetch("/v1/posts")
        .then(res=>res.json())
        .then(data=>{
            //서버로부터 받아온 배열로 상태값을 변경한다.
            //state를 변경하는 함수를 호출하면 App()함수가 다시 호출된다.
            //useState([]) 함수가 리턴해주는 배열의 0번방에는 새로운 posts배열이 들어있다.
            setPosts(data);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    /*
        useEffect(함수, 배열)
        1) 배열을 비워두면 여기 전달한 함수는 App 컴포넌넌트가 초기화되는시점에 최초 1번만 호출된다.
        => 이렇게 배열을 비워두면, 페이지가로딩되는시점에1번호출된다.
        
        2) 비워두지않으면...즉, 어떤 state값을 넣어주면 해당 state가 변경될때마다 호출된다.
        => useState의 상태값을(posts같은)을 배열에 넣어두면, 페이지가로딩되는시점에1번+변경되는시점에도 호출된다~
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
                //console.log(obj);
                //object에 있는 내용을 이용해서 JSON문자열 만들어내기
                const json = JSON.stringify(obj);
                //console.log(json);
                //fetch()함수를 이용해서 페이지 전환없이 post방식 요청하면서 json 문자열 전송하기
                fetch(url, {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:json //json문자열을넣을때는 body에 json문자열을 넣는다 //전에는 쿼리문자열을 넣었었지 
                })
                .then(res=>res.json())
                .then(data=>{
                    //data는 서버에서 응답한 json문자열이 object로 변경되어서 전달된다.
                    console.log(data);
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
                                fetch("/v1/posts/"+item.id, {
                                    method:"PUT", //PUT은 id를 제외한 전체수정을 할때 사용한다.// (so, title만수정하는데author도 같이 보냄냄)
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify(obj) //object를 json문자열로 변경해서 넣어준다.
                                })
                                .then(res=>res.json())
                                .then(data=>{
                                    refresh();
                                });
                            }}>수정</button></td>
                            <td><button onClick={()=>{
                                fetch("/v1/posts/"+item.id,{
                                    method:"DELETE"
                                })
                                .then(res=>res.json())
                                .then(data=>{
                                    //data는 삭제된 데이터가 들어온다.
                                    alert(data.author+"님의 post를 삭제했습니다.")
                                    refresh();
                                });
                            }}>x</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App;