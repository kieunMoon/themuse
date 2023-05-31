import axios from "axios";
import jwtDecode from "jwt-decode";
import { Component, useEffect, useState } from "react";
import styles from './write.module.css';
// import logo from 'C:/javascript/the-muse/src/img/TheMuse_logo.jpg'
 
const WriteUpdate = ({history, match}) => {
  const {musicalIdx} = match.params;
  const [musicalName, setMusicalName] = useState('');
  const [musicalImg, setMusicalImg] = useState('');          
  const [musicalActor, setMusicalActor] = useState('');
  const [musicalRunningtime, setMusicalRunningtime] = useState(0);
  const [musicalPrice, setMusicalPrice] = useState(0);
  const [musicalStartperiod, setMusicalStartperiod] = useState('');
  const [musicalEndperiod, setMusicalEndperiod] = useState('');
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
  const handlerChangeMusicalStartperiod = e => setMusicalStartperiod(e.target.value);
  const handlerChangeMusicalEndperiod = e => setMusicalEndperiod(e.target.value);
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
    musicalIdx,
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

 
  useEffect(()=>{
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
    
    axios.get(`http://localhost:8080/themuse/musicaldetail/${musicalIdx}`,
    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
    .then(response=> {
      console.log(response);
      setMusicalName(response.data.musicalName);
      setMusicalActor(response.data.musicalActor);
      setMusicalRunningtime(response.data.musicalRunningtime);
      setMusicalPrice(response.data.musicalPrice);
      setMusicalImg(response.data.musicalImg);
      setMusicalDetailImg(response.data.musicalDetailImg);
      setMusicalStartperiod(response.data.musicalStartperiod);
      setMusicalEndperiod(response.data.musicalEndperiod);
      setMusicalPickYn(response.data.musicalPickYn);
      setMusicalIntro(response.data.musicalIntro);
    })
   
  },[]);
  

  const handlerClickUpdate = (e) => {
    axios({
      method: "put",
      url: `http://localhost:8080/themuse/admin/updatedetailinfo/${musicalIdx}`,
      data: fd,
      headers: {
        "Content-Type": `multipart/form-data; `,
      },
      // setinputs: {musicalName : 'handlerChangeMusicalName', musicalActor: 'handlerChangeMusicalActor',
      //  musicalRunningtime:'handlerMusicalRunningtime', musicalPrice : 'handlerChangeMusicalPrice'}
    })

      .then((response) => {
        console.log(response.data)
       
        sessionStorage.setItem("musicalImg", response.data)
        
        alert("수정이 완료되었습니다.");
        history.push('/themuse/admin');
        
      }).catch(error => console.log(error));  
        
      
  };

  const handlerClickDelete = (e) => {
    axios.put(`http://localhost:8080/themuse/admin/deleteinfo/${musicalIdx}`)
      .then(response => {                                         
        console.log(response);
        if (response.data === 1) {                              
            alert('정상적으로 삭제되었습니다.');
            history.push('/themuse/admin');            
        } else { 
            alert('삭제에 실패했습니다.');
            return;
        }
    })
    .catch(error => {                                           
        console.log(error);
        alert(`삭제에 실패했습니다. (${error.message})`);
        return;
    });
};

        return (
 <div>
 
    <p className={styles.musical}>공연 수정</p>
    <div className={styles.box1}>
      {/* <form action="" method="GET" id="frm" name="frm">
        <input type="hidden" name="name" /> */}
        <ul className={styles.data}>
            <li>공연 제목: <input className={styles.info1} type="text" onChange={handlerChangeMusicalName} value={musicalName} /></li>
            <li>포스터&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<input className={styles.info1} type="file" id="posterImg" accept=".gif, .jpg, .png" onChange={handlerChangeMusicalImg}/> </li>
            <li>출연진&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text" onChange={handlerChangeMusicalActor} value={musicalActor} /></li>
            <li>관람 시간: <input className={styles.info1} type="text" onChange={handlerChangeMusicalRunningtime} value={musicalRunningtime}/></li>
            <li>가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text" onChange={handlerChangeMusicalPrice} value={musicalPrice} /></li>
            <li>공연 기간: <input className={styles.date} type="date" onChange={handlerChangeMusicalStartperiod} />&nbsp;&nbsp;~&nbsp;&nbsp;<input className={styles.date} type="date" onChange={handlerChangeMusicalEndperiod} /></li>
            <li>상세 정보: <input className={styles.info1} type="file" onChange={handlerChangeMusicalDetailImg} /></li>
            <li>MD PICK : <input type='checkbox' onChange={handlerChecked}  /></li>
            
           
        </ul>   
        {/* </form>      */}
    </div> 
 
       
        <input type="button" className={styles.finish} value="수정" onClick={handlerClickUpdate}/>
        <input type="button" className={styles.finish} value="삭제" onClick={handlerClickDelete}/>
</div>
   
       );
      
}

export default WriteUpdate;