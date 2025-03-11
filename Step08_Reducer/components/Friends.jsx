import React, { useReducer, useRef } from 'react';
import { v4 as uuid } from 'uuid';

const reducer = (state, action)=>{
    let newState;
    if(action.type ==="add"){
        newState={
            ...state,
            friends:[...state.friends, {id:uuid(), name:action.payload}]
        }
        }else if(action.type ==="reset"){
            newState={
                ...state,
                friends:[]
            }
        }else if(action.type ==="remove"){
            newState={
                ...state,
                friends:state.friends.filter(item=>item.id !== action.payload)
            }
        }else{
            newState=state;
    }
    return newState
}
//초기 상태값 //친구이름 입력하면 {id:"uuid", name:"이름"} 오브젝트를 만들어서, 배열로 관리할거임임
//friends:[{id:"uuid", name:"이름"}, {id:"uuid", name:"이름"}...]
const initState={
    userName:"kimgura",
    friends:[]
}
function Friends(props) {
    //useReducer(리듀서함수, 초기상태값)
    const [state, dispatch] = useReducer(reducer, initState);

    //특정 요소의 참조값을 관리하기 위한 hook
    const inputName = useRef();

    return (
        <div>
            <p>로그인된 userName : <strong>{state.userName}</strong> </p>
            <input ref={inputName} type="text" placeholder='친구이름입력...' />   
            <button onClick={()=>{
                //입력한 이름을 추가하는 action을 dispatch한다(동작을 발행)
                //inputName.current라는 방에는 참조값(input요소)이 들어있다.
                const name = inputName.current.value;
                //발행할 action을 object로 만든다. //type키값으로액션명 , payload로 이름
                const action = {type:"add", payload:name};
                //action 발행하기
                dispatch(action);
            }}>추가</button>
            <button onClick={()=>{
                const action={type:"reset"};
               dispatch(action);
            }}>Reset</button>
            <ul>
                {state.friends.map(item=>
                //state = { userName:"kimgura",  friends : [ {id:"uuid", name:"이름"}, {id:"uuid", name:"이름"}...] }
                    <li key={item.id}>
                        {item.name} <button onClick={()=>{
                            const action = {type:"remove", payload:item.id};
                            dispatch(action)
                        }}>x</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Friends;