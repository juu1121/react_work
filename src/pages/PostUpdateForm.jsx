import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostUpdateForm(props) {

    //경로 파라미터 /posts/:id/edit 값을 가지고있는 object얻어내기
    // {id:'수정할글번호'} 형식의 object가 리턴된다. 따라서 수정할 글번호는 params.id이다
    const params = useParams();
    console.log(params);

    //수정할 글을 상태값으로 관리한다.
    const [post, setPost] = useState({});

    //참조할 값을 저장해주는 hook
    let savedPost = useRef(null);   //savedPost는 object이고 current라는 방에 저장된 값이들어있다.
    //{ current : null} 이런형태태

    useEffect(()=>{
        //컴포넌트가 활성화 되는 시점에 수정할 회원의 번호를 이용해서 수정할 회원의 정보를 로딩한다.
        axios.get(`/posts/${params.ids}`)
        .then(res=>{
            setPost(res.data)
            ///useRdf()가 리턴한 object의 current에 초기 post를 저장해둔다.
            savedPost.current =res.data; 
        })
        .catch(err=>console.log(err));
    }, [])

    // title or author 입력란에 change 이벤트가 발생했을때 상태값을 변경하도록한다.
    const handleChange = (e)=>{
        setPost({
            ...post,
            [e.target.name]:e.target.value           
        })
    };

    const navigate = useNavigate();
    return (
        <>
            <h1>Post 수정 폼 입니다.</h1>
            <div>
                <label htmlFor="id">글번호</label>
                <input type="text" id="id" value={post.id} readOnly/>                
            </div>
            <div>
                <label htmlFor="title">제목</label>
                <input type="text" name="title" id="title" onChange={handleChange} value={post.title} />
            </div>
            <div>
                <label htmlFor="author">작성자</label>
                 <input type="text" name="author" id="author" onChange={handleChange} value={post.author} />              
            </div>
            <button onClick={()=>{
                axios.put(`/posts/${post.id}`, post)
                .then(res=>{
                    alert(res.data.id+"번 글을 수정했습니다.")
                    navigate("/posts");
                })
                .catch(err=>console.log(err));
            }}>수정확인</button>
            <button onClick={()=>{
                //useRef()를 이용해서 저장해두었던 초기 post로 되돌린다.
                setPost(savedPost.current);
            }}>취소</button>

        </>
    );
}

export default PostUpdateForm;