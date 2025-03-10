import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Post(props) {
    //"/posts?pageNum=x" 에서 pageNum과 같은 query parameter를 추출하기 수정을 위한 hook
    const [params, setParams] = useSearchParams({pageNum:1});

    const navigate=useNavigate();

    //페이지 정보를 state로 관리한다.
    const [pageInfo, setPageInfo] = useState({ list: [] });

    //페이지 요청해서 출력하는 함수
    const refresh = (pageNum)=>{
        axios.get("/v3/posts?pageNum="+pageNum)
        .then(res=>{
            //서버에서 응답한 data는 res.data에 들어있다.
            console.log(res)
            //상태값을 변경한다.
            setPageInfo(res.data);

            //페이징처리에 필요한 배열을 만들어서
            const result = range(res.data.startPageNum, res.data.endPageNum);
            //상태값을 변경한다.
            setPageArray(result);
        })
        .catch(error=>console.log(error));
    };

    //컴포넌트가 활성화되는 시점에 1페이지 정보를 얻어온다.
    useEffect(()=>{
        //query 파라미터값을 읽어와 본다
        let pageNum = params.get("pageNum");

        refresh(pageNum);
    }, [params])  //params가 변경될때 useeffect()안에 있는 함수가 다시 호출되도록한다.

    //navigate()함수를 이용해서 페이지를 변경하는 함수
    const move = (pageNum) =>{
        navigate(`/posts?pageNum=${pageNum}`)
    }

    //페이징 숫자를 출력할때 사용하는 배열을 상태값으로 관리하자
    const [pageArray, setPageArray] = useState([]);

    //페이징UI를 만들때 사용할 배열을 리턴해주는 함수를 만들어두고 활용하자 
    // //range(1,5)하면 [1,2,3,4,5] 배열이 생기는거임
    function range(start, end){
        const result=[];
        for(let i=start; i<=end; i++){
            result.push(i);
        }
        return result;
    }    


    return (
        <>
            <h1>글 목록입니다.</h1>
            <NavLink to="/posts/new">새 글 작성</NavLink>
            <table className="table table-striped">
                <thead className = "table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>
                                <NavLink to={`/posts/${item.id}/edit`}>수정</NavLink>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    axios.delete(`/v3/posts/${item.id}`)
                                    .then(res=>{
                                        alert(res.data.id+"번 글을 삭제했습니다.")
                                        //현재페이지정보가 다시 출력되도록한다=>2가지 방법이있음음

                                        //case1) refresh호출출
                                        //move가 아닌 refresh인이유, move에도 refresh가 있지만, params의 변화가있어야 호출되기에 직접 호출한다!
                                        //refresh(pageInfo.pageNum);

                                        //case2) filter를사용해서, 삭제된정보를 삭제된 배열을 얻어내, => 배열의 상태값변경
                                        // (여기서의 배열은, list와 여러정보가있는 pageInfo로 관리되는 배열이었지)
                                        //pageInfo.list에서 삭제된 글정보를 -> 실제 삭제한 배열을 얻어내서 상태값변경
                                        setPageInfo({
                                            ...pageInfo,
                                            list:pageInfo.list.filter(item=>item.id !== res.data.id)
                                        })
                                    })
                                    .catch(err=>console.log(err))
                                }}>삭제</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className = "pagination">
                <li className={`page-item ${pageInfo.startPageNum === 1 ? 'disabled':''}`} >
                    <a className = "page-link" href="#" onClick={(e)=>{
                        e.preventDefault();
                        move(pageInfo.startPageNum-1);
                    }} >Prev</a>                 
                </li>
                {pageArray.map(num=> //조건부로active을 넣었다 뺐다하기위해 백틱으로 문자열작성 //pageInfo.pageNum은 현재페이지넘이다
                    <li className={`page-item ${pageInfo.pageNum === num ? 'active':''}`} key={uuid()}> 
                        <a className="page-link" href="#" onClick={(e)=>{
                            e.preventDefault(); //링크의 기본동작 막기
                            move(num);
                        }}>{num}</a>
                    </li>
                )}
                <li className={`page-item ${pageInfo.totalPageCount > pageInfo.endPageNum ? '':'disabled'}`} >
                    <a className = "page-link" href="#" onClick={(e)=>{
                        e.preventDefault();
                        move(pageInfo.endPageNum+1);
                    }} >Next</a>                 
                </li>

            </ul>
        </>
    );
}

export default Post;