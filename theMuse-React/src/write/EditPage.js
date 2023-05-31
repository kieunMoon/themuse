import { Component } from "react";
import styles from './write.module.css';
import logo from 'C:/javascript/the-muse/src/img/TheMuse_logo.jpg'


const EditPage = () => {
  return (
    <div>

   


      <p className={styles.musical}>공연 수정</p>
    <div className={styles.box1}>
        <ul className={styles.data}>
            <li>공연 제목: <input className={styles.info1} type="text"/></li>
            <li>포스터&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<input className={styles.info1} type="text"/> <button onClick="">첨부</button></li>
            <li>출연진&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text"/></li>
            <li>관람 시간: <input className={styles.info1} type="text"/></li>
            <li>가격&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input className={styles.info1} type="text"/></li>
            <li>공연 기간: <input className={styles.date} type="date" />&nbsp;&nbsp;~&nbsp;&nbsp;<input className={styles.date} type="date" /></li>
            <li>상세 정보: <input className={styles.info1} type="text"/> <button onClick="">첨부</button></li>
            <li>MD's Pick: <input className={styles.checkBox} type="checkbox" /> </li>
            <li>소개글&nbsp;&nbsp;&nbsp;&nbsp;:  <input className={styles.info1} type="text"/></li>
        </ul>
    </div> 
        <input type="button" className={styles.Edit} value="수정"/>
        <input type="button" className={styles.Delete} value="삭제"/>
</div>

  );
}



export default EditPage;
