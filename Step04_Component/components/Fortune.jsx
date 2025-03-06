
//{data:"동쪽으로 가면 귀인을 만나요"} 라는 오브젝트가 props에 전달된다.
function Fortune(props){
    //부모 component가 전달한 property가 함수의 매개변수에 object로 전달된다.
    console.log(props);
    return(
        <>
            <h2>운세입니다.</h2>
            <p>오늘의 운세 : <strong>{props.data}</strong></p>
        </>
        
    )

}

export default Fortune;

