import axios from "axios";
import { Component, useEffect, useState }from "react";
import styles from './AdminListPage.module.css';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";

function AdminListPage ({history, match}) {
    const {musicalIdx} = match.params;

    const [datas, setDatas] = useState([]);
 
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
        else{
        axios.get('http://localhost:8080/themuse/musicallist',
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
            }
            if(error.response.status ===500) {
                alert('접근 권한이 없거나 오류가 발생 하였습니다.');
                history.push('/login');
            }
        })
    }
}, []);

    return (
        <div>
   
    
    
    {/* 왼쪽 메뉴바 */}
    <div className={styles.menu}>
        <th>관리자 페이지</th>
        <th><Link to="/themuse/admin">공연 리스트</Link></th>
        <th><Link to="/themuse/admin/write">공연 등록</Link></th>


    </div>
    {/* <p>공연 리스트</p> */}
    <div className={styles.box1}>
    {  
        datas && datas.map(musical => (
            <>
            <ul className={styles.musicalNamelist}>
        <Link to ={`/themuse/admin/updateinfo/${musical.musicalIdx}`}>
            <li>{musical.musicalName}</li>
        </Link>
        </ul>
        </>

    ))
}
    </div> 

        


</div>

    );

}








export default AdminListPage;