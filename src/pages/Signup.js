import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import signupStyled from '../css/signup.module.css';

function Signup() {
    //각각 값들의 usestate
    const [name, setName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [pw, setPw] = useState("");
    const [checkpw, setCheckPw] = useState("");
    const [elementaryschool, setElementarySchool] = useState("");
    const [middleschool, setMiddleSchool] = useState("");
    const [highschool, setHighSchool] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [graduation, setGraduation] = useState("");

    //각 값들의 조건 상태를 보이기 위한 usestate
    const [pwMessage, setPwMessage] = useState("");
    const [checkpwMessage, setCheckPwMessage] = useState("");

    //조건을 만족했는지 확인해주는 usestate
    const [ispw, setIsPw] = useState(false);
    const [ischeckpw, setIsCheckPw] = useState(false);

    const onNameChange = (e) =>{
        setName(e.target.value);
        console.log(e.target.value);
    }

    const onPhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
        console.log(e.target.value);
    }
    
     // 비밀번호 유효성 검사 함수
     const onPWChange = (e) => {
        const currentPW = e.target.value;
        setPw(currentPW);
        const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;// 비밀번호 조건식
        if(!PasswordReg.test(currentPW)){
            setPwMessage("비밀번호는 최소 하나의 문자와 숫자 그리고 하나의 특수 문자를 포함한 8자 이상이어야 합니다.");
            setIsPw(false);
        }// 비밀번호 조건식과 입력한 값이 일치하지 않은 경우
        else{
            setPwMessage("이 비밀번호를 사용할 수 있습니다.");
            setIsPw(true);
        }// 비밀번호 조건식과 입력한 값이 일치한 경우
    }  

    // 비밀번호 확인 유효성 검사 부분
    const onCheckPWChange = (e) => {
        const currenCheckPW = e.target.value;
        setCheckPw(currenCheckPW);
        if(pw !== currenCheckPW){
            setCheckPwMessage("비밀번호가 일치하지 않습니다.");
            setIsCheckPw(false);
        }
        else{
            setCheckPwMessage("비밀번호가 일치합니다.");
            setIsCheckPw(true);
        }
    }

    const onElementaryschoolChange = (e) => {
        setElementarySchool(e.target.value);
        console.log(e.target.value);
    }

    const onMiddleSchoolChange = (e) => {
        setMiddleSchool(e.target.value);
        console.log(e.target.value);
    }

    const onHighSchoolChange = (e) => {
        setHighSchool(e.target.value);
        console.log(e.target.value);
    }

    const onIntroduceChange = (e) => {
        setIntroduce(e.target.value);
        console.log(e.target.value);
    }

    const onGraduationChange = (e) => {
        setGraduation(e.target.value);
        console.log(e.target.value);
    }

    const navigate = useNavigate();

    const sendSignUpData = async() => {
        try {
            if (pw !== checkpw) {
              console.error('Passwords do not match.');
              return;
            }
    
            const response = await axios.post('http://49.247.33.67:8080/signup', {
              "username": name,
              "phonenumber": phonenumber,
              "password": pw,              
              "elementaryschool": elementaryschool,               
              "middleschool": middleschool,              
              "highschool": highschool,              
              "introduction": introduce,               
              "graduationyear": graduation
            });
    
            console.log('Server response:', response.data);
            alert("회원가입이 완료하였습니다.");
            navigate('/login');
          } catch (error) {
            console.error('Error sending data:', error);
          }
    }

    return(
        <>
             <div className={signupStyled.signup}>
                <p style={{fontSize: 25}}><strong>회원가입</strong></p>
                <label htmlFor="name">이름</label>
                <input 
                    id="name"
                    type="text" 
                    placeholder="이름을 입력하세요" 
                    name="name"
                    value={name}
                    onChange={onNameChange}>
                </input><br/>
                <label htmlFor="phonenumber">전화번호</label>
                <input 
                    id="phonenumber" 
                    type="text"
                    placeholder="예)01012345678"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={onPhoneNumberChange}>
                </input><br/>
                <label htmlFor="pw">비밀번호</label>
                <input 
                    id="pw"
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    name="pw"
                    value={pw}
                    onChange={onPWChange}>
                </input>
                <p>{pwMessage}</p>
                <label htmlFor="checkpw">비밀번호 확인</label>
                <input 
                    id="checkpw"
                    type="password" 
                    placeholder="비밀번호를 다시 입력하세요"
                    name="pw"
                    value={checkpw}
                    onChange={onCheckPWChange}>
                </input>                
                <p>{checkpwMessage}</p>
                <label htmlFor="elementaryschool">출신 초등학교</label>
                <input 
                    id="elementaryschool" 
                    type="text"
                    placeholder="출신 초등학교를 입력하세요"
                    name="elementaryschool"
                    value={elementaryschool}
                    onChange={onElementaryschoolChange}>
                </input><br/>
                <label htmlFor="middleschool">출신 중학교</label>
                <input 
                    id="middleschool" 
                    type="text"
                    placeholder="출신 중학교를 입력하세요"
                    name="middleschool"
                    value={middleschool}
                    onChange={onMiddleSchoolChange}>
                </input><br/>
                <label htmlFor="highschool">출신 고등학교</label>
                <input 
                    id="highschool" 
                    type="text"
                    placeholder="출신 고등학교를 입력하세요"
                    name="highschool"
                    value={highschool}
                    onChange={onHighSchoolChange}>
                </input><br/>
                <label htmlFor="introduce">간단한 자기소개</label>
                <textarea
                    id='introduce'
                    placeholder='20자 이내의 자기소개를 적어주세요'
                    name="introduce"
                    value={introduce}
                    onChange={onIntroduceChange}
                    maxLength="20"
                >    
                </textarea><br/>
                <label htmlFor="graduation">고등학교 졸업연도</label>
                <input 
                    id="graduation" 
                    type="text"
                    placeholder="고등학교 졸업연도를 입력하세요(예.1999년)"
                    name="graduation"
                    value={graduation}
                    onChange={onGraduationChange}>
                </input><br/>
                <button id={signupStyled.doSignupbtn} onClick={sendSignUpData}>회원 가입</button>
            </div>
        </>
    )
}

export default Signup;