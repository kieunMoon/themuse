import axios from "axios";
import { Component, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";


import styles from './SeeAll.module.css';


function SeeAll ({history}) {

  const [datas, setDatas] = useState([]);
  const image = `http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/getImage/`;
    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/themuse/musicallist` , 
        { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
          .then(response => {
            console.log(response);
            setDatas(response.data);
          })
          .catch(error =>  {
            console.log(error);
            if(error.response.status ===403) {
                alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                history.push('/login');
            }if(error.response.status === 500) {
              alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                history.push('/login');
            }
        });
    }, []);
  
        return(
          <>
        <div className={styles.seeAllBack}>
           
        
      
      <p className={styles.hero_header}></p>
      

      <div className={styles.products}>
       <h1>전&nbsp;체&nbsp;&nbsp;보&nbsp;기</h1>
      {
        datas && datas.map(musical => (
        <Link to={`/themuse/musicaldetail/${musical.musicalIdx}`}>
          <img src= {image + musical.musicalImg} />
          <p className={styles.mName}>{musical.musicalName}</p>
          <p className={styles.period}>{musical.musicalStartperiod} ~ {musical.musicalEndperiod}</p>
          </Link>))     

      } 
       
        <div className={styles.clearfix}></div>
      </div>
   
     
    </div>            
    </>
    );
}

export default SeeAll;