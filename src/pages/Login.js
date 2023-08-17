import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginStyled from '../css/login.module.css';
import axios from 'axios';

function Login() {

    const [userPhoneNum, setUserPhoneNum] = useState('');
    const [userPW, setUserPW] = useState('');

    const saveUserPhoneNum = (e) => {
        setUserPhoneNum(e.target.value);
        console.log(e.target.value);
    }
    
    const saveUserPW = (e) => {
        setUserPW(e.target.value);
        console.log(e.target.value);
    };
    
    const navigate = useNavigate();

    return(
        <>
            <div className={loginStyled.login}>
                <p style={{fontSize: 25, paddingTop: "15px"}}><strong>로그인</strong></p><br/>
                <label htmlFor="inputPhoneNum">아이디</label>
                <input id="inputPhoneNum" 
                    type="text" 
                    placeholder="핸드폰 번호를 입력하세요"
                    name="inputPhoneNum"
                    value={userPhoneNum}
                    onChange={saveUserPhoneNum}
                ></input><br/>
                <label htmlFor="inputPW">비밀번호</label>
                <input 
                    id="inputPW"
                    type="password" 
                    placeholder="비밀번호를 입력하세요"
                    name="password"
                    value={userPW}
                    onChange={saveUserPW}
                ></input><br/><br/>
                <button id={loginStyled.loginbtn} onClick={ ()=>{ Token() }}>로그인 하기</button><br/>
                <button id={loginStyled.signupbtn}><Link to="/signup" style={{textDecoration: "none", color: "white"}}>회원가입하기</Link></button>
            </div>
        </>
    )

    function Token(){
        console.log('토큰 작업 실행');
        axios
            .post('http://49.247.33.67:8080/login',{
                "phonenumber": userPhoneNum,
                "password": userPW
            })
            .then(function (response){
                console.log(response);
                const authHeader = response.headers['authorization'];
                
                if(authHeader){
                   
                    //로컬 스토리지에 토큰 저장
                    localStorage.setItem('login-token', authHeader);
                    console.log(authHeader);
                }
                navigate('/');
            })
            .catch(function (error){
                alert("로그인 실패😣");
            }

        )

    }


}

export default Login;