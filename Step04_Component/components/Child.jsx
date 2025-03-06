function Child(){

    return (
        <div>
            <h2>Child Component 입니다.</h2>
            <button onClick={(e)=>{
                e.target.innerText="버튼눌러쓔"
            }}>눌러보셈</button>
        </div>
    )
}

export default Child;