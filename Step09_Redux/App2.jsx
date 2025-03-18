import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from 'jsontokens';
function App2(props) {
    const isLogin = useSelector((state)=>state.isLogin);
    const userName = useSelector((state)=>state.userName);
    const dispatch = useDispatch();

    //입력한 userName, password를 상태값으로 관리
    const  [state, setState] = useState({
        userName:"",
        password:""
    });

    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const [timeoutId, setTimeoutId] = useState(null);
    //컴포넌트가 활성화되는 시점에 한 번 호출되는 함수 등록록
    useEffect(()=>{
        //만일 localStorage에 저장된 token이 있다면
        if(localStorage.token){
            //토큰을 디코딩 (앞에 7자리를 제거한, Bearer_ 를 제거한 문자열을 디코딩)
            const result = decodeToken(localStorage.token.substring(7));
            //토큰에 담긴 정보가 object에 담겨있다.
            console.log(result);
            //expire되는 시간이 초 단위로 저장되어 있으므로 1000을 곱해서 ms초 단위로 만든다.
            const expTime = result.payload.exp*1000
            //현재 시간 ms초 단위로 얻어내기
            const now = new Date().getTime()
            //만일 유효기간이 만료되지 않았다면
            if(expTime > now){
                dispatch({type:"LOGIN_STATUS", payload:true});
                dispatch({type:"USER_NAME", payload:result.payload.sub});
                //만료까지 남은시간?
                const remainTime=expTime-now;
                //남은 시간이 경과하면 실행할 함수 등록
                const id = setTimeout(()=>{
                    //이 함수가 호출되면 token이 expire된 갓이다.
                    alert("로그아웃되었습니다. ")
                    dispatch({type:"LOGIN_STATUS", payload:false});
                    delete localStorage.token;
                }, remainTime);
                setTimeoutId(id);
            }else{
                //유효기간이 만료된 token 은 삭제
                delete localStorage.token;
            }
        }
    }, [])
    return (
        <div>
            <h1>인덱스 페이지입니다.</h1>
            { isLogin ? 
                <p>
                    <strong>{userName}</strong>님 로그인주웅웅...
                    <button onClick={()=>{
                        delete localStorage.token;
                        dispatch({type:"LOGIN_STATUS", payload:false});
                        if(timeoutId){
                            clearTimeout(timeoutId);
                            setTimeoutId(null);
                        }
                    }}>로그아웃</button>
                    <button onClick={()=>{
                        //요청의 header에 유효한 token을 같이 보내야 응답을 받을수있다.
                        axios.get("/api/ping", {
                            headers : {
                                Authorization:localStorage.token
                            }
                        })
                        .then(res=>{
                            console.log(res.data);
                        })
                        .catch(error=>{
                            console.log(error);
                        })
                    }}>ping 요청</button>
                </p>
            :
                <>
                <input onChange={handleChange} type="text" name="userName" placeholder='사용자명...' />
                <br />
                <input onChange={handleChange} type="password" name="password" placeholder='비밀번호...' />
                <button onClick={()=>{
                    //state object를 넣어주면 json 문자열이 body에 포함되어서 전송된다.
                    axios.post("/api/auth", state)
                    .then(res=>{
                        //res.data에 발급받은 토큰이 들어온다.
                        console.log(res.data);
                        //발급받은 token을 localStorage에 저장하기
                        //localStorage는 해당 웹브라우저에 영구저장되는 object라고 생각하면된다.
                        //단, 문자열만 저장할수있는 object //숫자나 true를 넣어도 문자열로 변환되서 저장된다.
                        localStorage.token=res.data;
                        dispatch({type:"USER_NAME", payload:state.userName})
                        dispatch({type:"LOGIN_STATUS", payload:true})
                    })
                    .catch(error=> {
                        console.log(error);
                    });
                }}>로그인</button>
                </>
            }
        </div>
    );
}

export default App2;