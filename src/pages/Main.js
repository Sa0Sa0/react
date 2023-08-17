import axios from 'axios';
import React, { useEffect, useState } from 'react';
import mainStyled from '../css/main.module.css';
import { useNavigate, Link } from 'react-router-dom';

function Main() {

    let navigate = useNavigate();
    let [person, setPerson] = useState([]);
    let [school, setSchool] = useState('none'); //학교 버튼
    let [click2, setClick2] = useState('0'); //메뉴 버튼
    //찾은 이름 정보 저장 
    let [find, setFind] = useState({
        username : '',
        phonenumber : ''
    });
    //사용자 정보 저장
    let [userInfo, SetUserInfo] = useState(
        {
            username : '아직 없음',
            elementaryschool : '아직 없다',
            middleschool : 'no data',
            highschool : 'nono'
        }
    );

    //테스트 배열 
    let [board,setBoard]=useState([
        {
        "boardid" : 0,
        "username" : "김준식",
        "photo" : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQMjP1%2FbtrxKhXg1Or%2Fm7tHROlGRtG5lPtLU3e261%2Fimg.png",
        "time" : "32분전",
        "replies" : [
          {
              "username" : "구예원",
              "contents" : "재밌네요"
          },
          {
              "username" : "오성훈",
              "contents" : "저도 이건 재밌네요"
          },
          {
              "username" : "김준식",
              "contents" : "재밌으세요 이게?"
          }

      ]
    }]);
    
    //해당 이름 찾았는지
    let [findBool, setFindBool] = useState('0');

     //사용자가 입력하는 이름 
    let [name, setName] = useState(''); 
    const saveUserName = (e) => {
        setName(e.target.value);
        console.log(e.target.value);
    };

    useEffect(()=>{
        
        /* if(!token){
            <Link to="/login"></Link>
        } */
        //localStorage.setItem('login-token', null);
        axios
        //http://49.247.33.67:8080/user/myinfo
            .get(`http://49.247.33.67:8080/user/myinfo`,getHeadersWithToken())
            .then( (response)=>{ 
                console.log(response.data);
                SetUserInfo( response.data );

            })
            .catch( ()=> {
                console.log('서버 연결 실패욤');
                //navigate('/login');
            });
    
            function getHeadersWithToken() {
                const token = localStorage.getItem('login-token');
                if (token) {
                    console.log(token);
                  return {
                    headers: {
                      Authorization: `${token}`,
                    },
                  };
                }
                return {};
              };
    },[ ]);

    return(
        <>
            <div className={mainStyled.mainpage}>

                <p className={mainStyled.title}><span>{userInfo.username}</span>님의 동창은?</p>
                    <div className={mainStyled.schoolBtns}>
                        <button onClick={ ()=>{ setSchool('elementary'); School(school); setFindBool(false);}} className={ school === 'elementary' ? `${mainStyled.clickBtn}` : `${mainStyled.schoolBtn}` }>{userInfo.elementaryschool}</button>
                        <button onClick={ ()=>{ setSchool('middle'); School(school); setFindBool(false); }} className={ school ==='middle' ? `${mainStyled.clickBtn}` : `${mainStyled.schoolBtn}` } >{userInfo.middleschool}</button>
                        <button onClick={ ()=>{ setSchool('high'); School(school); setFindBool(false);}} className={ school ==='high' ? `${mainStyled.clickBtn}` : `${mainStyled.schoolBtn}` }>{userInfo.highschool}</button>
                    </div>
                    <div className={mainStyled.menuBtns}>
                        <button  onClick={ ()=>{ setClick2('1'); School(school); }  } className={ click2 ==='1' ? `${mainStyled.clickMenu}` : `${mainStyled.menuBtn}` } >나의 옛 친구들</button>
                        <button  onClick={ ()=>{ setClick2('2'); School(school);} } className={ click2 ==='2' ? `${mainStyled.clickMenu}` : `${mainStyled.menuBtn}` } >커뮤니티</button>
                    </div>
                
                    { click2==='1' ? 

                    //친구들 버튼
                    <>
                        <div className={mainStyled.search}>
                            <input 
                                id="findName"
                                type="string" 
                                placeholder="이름을 입력해주세요"
                                value={name}
                                onChange={saveUserName}
                            ></input>
                            <button onClick={ ()=>{ FindName(name) }}>이름으로 검색</button>
                        </div>
                        <div className={mainStyled.list}>
                        {
                            findBool ? <Person person={find}/> 
                            : person && person.map(function(a,i){
                                return <Person person={person[i]}/> 
                                }) 
                        }
                        </div>
                    </>
                        
                    : 
                    

                    //커뮤니티 화면
                    
                        
                        <Board/> 
                   
                        
                    }
                
            </div>
        </>
    )

    function School(){

            //사람 데이터 가져오기 
            axios
            //http://49.247.33.67:8080/user/find/${str}
            .get(`http://49.247.33.67:8080/user/find/${school}`,getHeadersWithToken())
            .then( (response)=>{ 
                const newArr = [...response.data];
                setPerson(newArr);
                console.log(person);
            })
            .catch( ()=> {
                console.log('서버 연결 실패욤');
            });

            console.log('글 가져오기');


            axios
        //http://49.247.33.67:8080/user/board/${str}
        .get(`http://49.247.33.67:8080/user/board/${school}`,getHeadersWithToken())
        .then( (response)=>{ 
        
            const newArr = [...response.data];
            setBoard(newArr);
            console.log(board);
        })
        .catch( ()=> {
            console.log('서버 연결 실패욤');
        });
    
    }

    function PostList(){

        //글 가져오기
        

    }


    //헤더에 토큰 넣는 함수
    function getHeadersWithToken() {
        const token = localStorage.getItem('login-token');
        if (token) {
            console.log(token);
          return {
            headers: {
              Authorization: `${token}`,
            },
          };
        }
        return {};
      };

    function Board(){

        useEffect(()=>{
            PostList();
        },[]);

        
        //리뷰 Input 값 저장 
        const [review, setReview] = useState('');
        const saveReview = (e) => {
            setReview(e.target.value);
            console.log(e.target.value);
        };


        

        const [isOpen, setIsOpen] = useState(false);

        const toggleAccordion = () => {
            setIsOpen(!isOpen);
        };


        function ReviewAccordian({ username, contents }){


            
            return (
                <>
                    {isOpen && 
                    
                    <div className={mainStyled.accordionContent}>
                        <p className={mainStyled.reviewUsername} style={{fontWeight: "bold"}}>{username}</p>
                        <p className={mainStyled.reviewContents}>{contents}</p>
                    </div>
                    }
                </>
            );
        }

        return(
        
            <>
            { board && board.map( function(a,i){
                return(
                    <div className={mainStyled.board}>
                    <button id = {mainStyled.writebtn}><Link style={{ textDecorationLine: 'none' }} to="/write"><img className={mainStyled.writeicon} src='/pencil.png'></img></Link></button>
                    <p className={mainStyled.username}>{board[i].username}</p>
                    <div className={mainStyled.photoContainer}><img className={mainStyled.photo} src={board[i].photo}/></div>
                    <p className={mainStyled.content}>{board[i].contents}</p>
                    <div className={mainStyled.accordionItem}>
                        <div className={mainStyled.review}>
                            <input className={mainStyled.reviewInput}
                                id="inputRV"
                                type="text" 
                                placeholder="댓글달기"
                                name="password"
                                value={review}
                                onChange={saveReview}
                            ></input>
                            <button onClick={()=>{ ReviewPost(board[i]) }}>게시</button>
                        </div>
                        <div className={mainStyled.accordionButton} onClick={toggleAccordion}>
                            <p className={mainStyled.reviewmore}>댓글 ({board[i].replies.length})<span>더보기</span></p>
                        </div>
                        {board[i].replies.map((a, i) => (
                            <ReviewAccordian
                                key={i}
                                username={a.username}
                                contents={a.contents}
                            />
                        ))}
                    
                    </div><br/>
                    

                </div>
                )
                
               
           

            
                        })
        
                    }
            </>
        )
       
        
        function ReviewPost(board){

            const token = localStorage.getItem('login-token');

            console.log(board.boardid);
            console.log(review);
            axios
            .post('http://49.247.33.67:8080/save/reply',{
                "boardid" : board.boardid,
                "contents" : review,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then( (response)=>{ 
                console.log(response.data);
            })
            .catch( ()=> {
                console.log('서버 연결 실패욤');
            }); 
        }


    }

    function FindName(name){
        console.log('찾는 중');
        person.map(function(a,i){
            if(person[i].username===name){
                var newOb = {
                    username : person[i].username,
                    phonenumber : person[i].phonenumber
                }
                console.log(newOb);
                setFind( newOb );
                setFindBool(true);
            }

            //return <Person person={person[i]}/> 
        });
        if(findBool===false){
            alert('그 친구는 등록되어있지 않아요😣');
        }
    }
    
}

function Person(props){
    return(
      <div className={mainStyled.person}>
        <h4>{props.person.username}</h4>
        <p>{props.person.phonenumber}</p>
      </div>
    )
  }




export default Main;