import React from 'react';
import { useSelector } from 'react-redux';

function Child(props) {
    const isLogin = useSelector((state)=>state.isLogin);
    const userName = useSelector((state)=>state.userName);

    return (
        <div style={{
            height:"100px",
            "background": "yellow"
        }}>
            <h2>Child Component</h2>
            { isLogin ?  <p> <strong>{userName}</strong>님 반갑습니다 </p> : "" }
            { isLogin &&  <p> <strong>{userName}</strong>님 반갑습니다 </p>}
        </div>
    );
}

export default Child;