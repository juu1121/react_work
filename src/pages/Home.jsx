
import axios from 'axios';
import React from 'react';

function Home(props) {
    return (
        <div>
            <h1>홈홈홈홈 인덱스페이지입니다~</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res=>{
                    alert(res.data);
                })
                .catch(error=>{
                    alert("응답하지않음")
                });
            }}>ping요청해보기 </button>
        </div>
    );
}

export default Home;