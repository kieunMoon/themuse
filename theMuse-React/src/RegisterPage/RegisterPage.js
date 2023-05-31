import { useState } from "react";
import  axios  from "axios";
import styles from './RegisterPage.module.css';
import background from './background.jpg';

const RegisterPage = ({history}) => {

    const [ userId, setUserId ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [ userConfirmPassword, setUserConfirmPassword ] = useState('');
    const [ userNickname, setUserNickname ] = useState('');
    
    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);
    const handlerChangeUserConfirmPassword = e => setUserConfirmPassword(e.target.value);
    const handlerChangeUserNickname = e => setUserNickname(e.target.value);


    const onSubmitHandler = (e) => {


        e.preventDefault();
            if (userPassword !== userConfirmPassword) {
                return alert ('비밀번호가 같은지 확인해 주세요.');
            }
            
            axios.post('http://localhost:8080/regist', 
            {userId,
             userPassword,
             userNickname
            }).then(response => {
                    console.log(response);
                    history.push('/login');
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
    };
        return(
<div>          
    
    <div className={styles.imgbox}>
    <img className={styles.background} src={background} alt="왜안떠"/>   
        <div className={styles.login}>
                <label>아이디</label>
                <br/>
                <input className={styles.inputText} type="text" onChange={handlerChangeUserId}/>
                <br/>
                <label>닉네임</label>
                <br/>
                <input className={styles.inputText} type="text"  onChange={handlerChangeUserNickname}/>
                <br/>
                <label>비밀번호</label>
                <br/>
                <input className={styles.inputText} type="password"  onChange={handlerChangeUserPassword}/>
                <br/>
                <label>비밀번호 확인</label>
                <br/>
                <input className={styles.inputText} type="password"  onChange={handlerChangeUserConfirmPassword}/>
                <br/>
                <button className={styles.signup} onClick={onSubmitHandler}>회원가입</button>
        </div>
    </div>   
</div>
);
        };
export default RegisterPage;