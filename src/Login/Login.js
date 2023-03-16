import { useState } from "react";
import axios from "axios";

import styles from './Login.module.css';
import stamp from './login_stamp.png';
import loginImg from  './login_background.jpg'
import { Link } from 'react-router-dom';


const Login = ({history}) => {
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);

    const handlerOnLoginClick = e => {
       
        axios.post(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/login`, { userId, userPassword })
            .then(response => {
                console.log(response);
                if (response.data) {
                    alert('정상적으로 로그인되었습니다.');
                    sessionStorage.setItem("token", response.data);
                    window.location.replace('/themuse');
                } else {
                    alert('ID, PW가 일치하지 않습니다. 확인 후 다시 시도해 주세요.');
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error); 
                alert('ID, PW가 일치하지 않습니다. 확인 후 다시 시도해 주세요.');
                sessionStorage.clear();
            });
    };


    return (
        <>
 
<div>
  <div className={styles.backimg}>
  <img className={styles.loginImg} src={loginImg} alt="왜안떠"/> 
    {/* 로그인 카드(초대장 컨셉입니다 *^^*) */}
    <div className={styles.SigninCard}>
            <p className={styles.signIn}>&nbsp;&nbsp;Sign in</p>
            <br/>
        <ul className={styles.card}>   
           <li className={styles.signIntext}>&nbsp;ID&nbsp;&nbsp; &nbsp;<input type="text" value={userId} onChange={handlerChangeUserId} /></li>
            <br/>
           <li className={styles.signIntext}>PW &nbsp;&nbsp;<input type="password" value={userPassword} onChange={handlerChangeUserPassword} /></li>
            <br/>
            <Link to="/regist"><button>회원가입</button></Link>
            <button onClick={handlerOnLoginClick}>로그인</button>
            <img className={styles.stamp} src={stamp} alt="왜안뜨냐고"/>
            
        </ul> 
        </div>    
    </div>
  </div>          
            
        </>
    );
};

export default Login;