/* 
    특정 component에만 적용될 외부 css파일을 만들떄는 xxx.module.css형태로 만들어야한다.
    import 된 myCss는 object이다.
    -object의 구조
    {클래스명:"변형된클래스명," ...}
*/

import myCss from "./css/Study.module.css";

function Study(props) {
    //myCss는 object이다.
    console.log(myCss)
    return (
        <div>
            <h2 className={myCss["my-color"]}>Study 입니다.</h2>
            <p className={myCss["my-color"]+" "+ myCss["bg-yellow"]}>p1</p>
            <p className={`${myCss["my-color"]} ${myCss["bg-yellow"]}`}>p1</p>
            <p className={myCss.aaa}>테스트!!!</p>
            <p className={myCss["aaa"]}>테스트!!!</p>
        </div>
    );
}

export default Study;