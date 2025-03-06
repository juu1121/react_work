
import { v4 as uuid } from "uuid";


function List(props){

    return (
        <>
            <h2>목록입니다.</h2>
            <ul>
                {props.names.map((item,index)=><li ket={uuid()}>{item} <button onClick={()=>{
                    //부모가 전달해준 함수를 호출하면서, 삭제할 index를 전달한다.
                    props.onDelete(index)
                }}>X</button></li>)}
            </ul>
        </>

    )
}

export default List;