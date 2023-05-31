import axios from "axios";
import jwtDecode from "jwt-decode";
import { Component, useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from './write.module.css';
import logo from 'C:/javascript/the-muse/src/img/TheMuse_logo.jpg'
 
const Write =  ({history}) => {
    

  useEffect(() => {
    const token = sessionStorage.getItem('token');
        if (sessionStorage.getItem('token')==null) {
            alert('로그인 후 이용하실 수 있습니다.');
            window.location.replace('/login');
        }

        const decodedToken = jwtDecode(token);
       
        
        let userRole = decodedToken.userRole;

        if(userRole != "ADMIN"){
            console.log(userRole);
            alert('관리자 권한이 없습니다.');
            history.push('/themuse');
        }    

  }, []);



  const [musicalName, setMusicalName] = useState('');
  const [musicalImg, setMusicalImg] = useState('');          
  const [musicalActor, setMusicalActor] = useState('');
  const [musicalRunningtime, setMusicalRunningtime] = useState(0);
  const [musicalPrice, setMusicalPrice] = useState(0);
  const [musicalStartperiod, setMusicalStartperoid] = useState('');
  const [musicalEndperiod, setMusicalEndperoid] = useState('');
  const [musicalDetailImg, setMusicalDetailImg] = useState('');
  const [musicalIntro, setMusicalIntro] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [musicalPickYn, setMusicalPickYn] = useState('N');
  const fd = new FormData();

  const handlerChangeMusicalName = e => setMusicalName(e.target.value);

  const MAX_FILE_SIZE = 1 * 1024 * 1024 * 10;

  const handlerChangeMusicalImg = e => {
    if (!e.target.files[0].type.match("image/.*")) {
      alert("이미지 파일만 업로드가 가능합니다.");
      return;
    } else if (e.target.files[0].size > MAX_FILE_SIZE) {
      alert("이미지 크기는 10MB를 초과할 수 없습니다.");
      return;
    }
    setMusicalImg(e.target.files);
  };


  
  const handlerChangeMusicalActor = e => setMusicalActor(e.target.value);
  const handlerChangeMusicalRunningtime = e => setMusicalRunningtime(e.target.value);
  const handlerChangeMusicalPrice = e => setMusicalPrice(e.target.value);
  const handlerChangeMusicalStartperoid = e => setMusicalStartperoid(e.target.value);
  const handlerChangeMusicalEndperoid = e => setMusicalEndperoid(e.target.value);
  const handlerChangeMusicalDetailImg = e => {
    if (!e.target.files[0].type.match("image/.*")) {
      alert("이미지 파일만 업로드가 가능합니다.");
      return;
    } else if (e.target.files[0].size > MAX_FILE_SIZE) {
      alert("이미지 크기는 1MB를 초과할 수 없습니다.");
      return;
    }
    setMusicalDetailImg(e.target.files);
  };
  
  const handlerChangeMusicalIntro = e => setMusicalIntro(e.target.value);
  const handlerChecked = e => {
    setIsChecked(!isChecked);
    if(!isChecked) {
      setMusicalPickYn('Y')
    }else{
      setMusicalPickYn('N')
    }
  }

  

  let dataSet = {
    musicalName,
    musicalActor,
    musicalRunningtime,
    musicalPrice,
    musicalStartperiod,
    musicalEndperiod,
    musicalIntro,
    musicalPickYn

  };

  fd.append(
    "data",
    new Blob([JSON.stringify(dataSet)], { type: "application/json" })
  );
  Object.values(musicalImg).forEach((file) => {
    fd.append("musicalImg", file)
  });
  Object.values(musicalDetailImg).forEach((file) => {
    fd.append("musicalDetailImg", file)
  });

 
  
  

  const onSubmitHandler = (e) => {
      e.preventDefault();

      if(musicalName ===""){
          alert('뮤지컬 제목이 비어있습니다.');
          return;
      }else if(musicalActor ==='') {
          alert('배우를 입력해주세요');
          return;
      }else if(musicalRunningtime ===0) {
          alert('관람시간을 입력해주세요');
          return;
      }else if(musicalPrice === 0) {
        alert('가격을 잘못 입력하셨습니다.');
        return;
      }else if(musicalStartperiod ==='' || musicalEndperiod==='') {
        alert('상영 기간을 입력해주세요')
        return;
      }else if(musicalDetailImg==='') {
        alert('상세 정보 사진을 첨부해주세요')
        return;
      }
     
      

      axios({
        method: "post",
        url: `http://localhost:8080/themuse/admin/insertmusical`,
        data: fd,
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      })
        .then((response) => {
          console.log(response.data)
         
          sessionStorage.setItem("musicalImg", response.data)
          alert("등록이 완료되었습니다.");
     
        });
    };
  
  
  
  
  

        return (
 <div>

<div className={styles.musical}>공연 등록</div>
    <div className={styles.box1}>
        <ul className={styles.data}>
            <li>공연 제목: <input className={styles.info1} type="text" onChange={handlerChangeMusicalName}/></li>
            <li>포스터&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<input className={styles.info1} type="file" id="posterImg" accept=".gif, .jpg, .png" onChange={handlerChangeMusicalImg}/> </li>
            <li>출연진&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text" onChange={handlerChangeMusicalActor}/></li>
            <li>관람 시간: <input className={styles.info1} type="text" onChange={handlerChangeMusicalRunningtime}/></li>
            <li>가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text" onChange={handlerChangeMusicalPrice}/></li>
            <li>공연 기간: <input className={styles.date} type="date" onChange={handlerChangeMusicalStartperoid}/>&nbsp;&nbsp;~&nbsp;&nbsp;<input className={styles.date} type="date" onChange={handlerChangeMusicalEndperoid} /></li>
            <li>상세 정보: <input className={styles.info1} type="file" onChange={handlerChangeMusicalDetailImg}/></li>
            <li>MD PICK : <input type='checkbox' onChange={handlerChecked} /></li>
            
            
        </ul>
        
    </div> 
        <input type="button" className={styles.finish} value="등록" onClick={onSubmitHandler}/>
</div>
   
       );
      
}

export default Write;