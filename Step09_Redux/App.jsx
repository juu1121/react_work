import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Child from "./components/Child";

function App(){

    // redux store에서 관리되는 state는 useSelector() 라는 hook을 이용하면 사용할수있다
    
    //useSelector를 호출하면서 함수를 넣어주면, 그 함수의  매개변수에는 store에서 관리되는 state가 전달된다.
    //state.userName에서 리턴되는 userName이 useSelector의 리턴값이 된다.
    const isLogin = useSelector((state)=>state.isLogin);
    const inputName = useRef();
    //action을 발행할때 사용하는 hook
    const dispatch = useDispatch();

    const userName = useSelector((state)=>state.userName);
    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            { isLogin ?
                <p>
                    <strong>{userName}</strong>님 로그인 중...
                    <button onClick={()=>{
                        //isLogin= false로 변경해보세요
                        
                        dispatch({type:"LOGIN_STATUS", payload:false});
                    }}>로그아웃</button>
                </p>
            :
                <>
                    <input ref={inputName} type="text" placeholder="사용자명..." />
                    <button onClick={()=>{
                        //입력한 userName
                        const userName = inputName.current.value;
                        //userName을 변경하는 action
                        const action1 = {type:"USER_NAME", payload:userName};
                        // 로그인 상태를 변경하는 action
                        const action2 = {type:"LOGIN_STATUS", payload:true};
                        //action발행하기
                        dispatch(action1);
                        dispatch(action2);

                    }}>로그인</button>
                </>
            }
            <Child/>
        </div>
    )
}

export default App;