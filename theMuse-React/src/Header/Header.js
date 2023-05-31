import { Route, Link } from 'react-router-dom';
import { Component, useEffect, useState } from "react";
import styles from './Header.module.css';
import logo from 'C:/javascript/the-muse/src/Header/TheMuse_logo.png'

import jwt_decode from "jwt-decode";



const Header = () => {
  const [isLogin, setIsLogin] = useState('false');
  const [userNickname, setUserNickname] = useState('');


  const handlerOnLogoutClick = () => {
    alert("로그아웃되었습니다.");
    sessionStorage.clear();
    
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')== null) {
      setIsLogin(false);
      
    }else{
      
    const token = sessionStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    setUserNickname(decodedToken.userNickname);
    console.log(userNickname);
    setIsLogin(true);
    

   
    }

  }, [])

  if(isLogin) {
    return (
      <div className={styles.header}>
         <li><Link to="/themuse"><img className={styles.logo} src={logo} alt="왜안떠"/></Link></li>
          <ul className={styles.nav}>
  
            <li><Link to="/themuse/admin">ADMIN</Link></li>
            <li><Link to="/themuse">HOME</Link></li>
            <li><Link to="/themuse/musicallist">SEEALL</Link></li>
            {/* 로그인 안한 상태에선 로그인, 로그인상태에선 (닉네임)님 + 로그아웃 */}
  
            
            <li> <p>{userNickname}님 환영합니다. <a href="/login"> <button  className={styles.logout} onClick={handlerOnLogoutClick}>LOGOUT</button></a> </p></li>
          

          </ul>
  
        </div>
  
    );
  }else{
    return (
      <div className={styles.header}>
         <li><Link to="/themuse"><img className={styles.logo} src={logo} alt="왜안떠"/></Link></li>
          <ul className={styles.nav}>
  
            <li><Link to="/themuse/admin">ADMIN</Link></li>
            <li><Link to="/themuse">HOME</Link></li>
            <li><Link to="/themuse/musicallist">SEEALL</Link></li>       
            <li><Link to="/login">LOGIN</Link></li> 
          </ul>
  
        </div>
    );
  }
  }

  export default Header;
