import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import writing from "../css/writepop.module.css"

function Write() {
  const [contents, setContents] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    const selectedFile = e.target.files[0];
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleContentsChange = (e) => {
    setContents(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo); // 'photo' 변수명으로 사진 추가
    formData.append('contents', contents);

    const token = localStorage.getItem('login-token'); // 로컬 스토리지에서 토큰 가져오기
    try {
      const response = await axios.post('http://49.247.33.67:8080/user/board', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert("글 등록이 완료되었습니다!");
      navigate('/');
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  
  return (
    <div className={writing.write}>
      <h2>SNS 글쓰기🖊</h2><br/>
      <form onSubmit={handleSubmit}>
        <textarea 
            id = {writing.context}
            name = "context" 
            value={contents}
            placeholder="입력하고 싶은 본문 내용을 입력하세요" 
            onChange={handleContentsChange} 
            required
        /><br/><br/>
        <label>올리고 싶은 사진 선택📸</label><br/>
        <input 
            type="file" 
            accept='image/*'
            onChange={handlePhotoChange} 
        /><br/><br/>
         {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '50%', height: 'auto' }} />}<br/><br/>
        <button type="submit">글 등록하기</button>
      </form>
    </div>
  );
};

export default Write;


