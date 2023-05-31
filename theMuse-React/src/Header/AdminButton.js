import { Component } from "react";
import { Route, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function AdminButton() {     
    const [IdDatas, setIdDatas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/regist')
          .then(response => {
            console.log(response);
            setIdDatas(response.data.IdDatas);
          })
          .catch(error => console.log(error));
      }, []);

{/* 어드민으로 등록된 계정에만 보이게 */}
    if ({IdDatas} === 'admin'){
    return <li><Link to="/admin">ADMIN</Link></li>;
     }
     else {
    return null;}
    
    
     }

     export default AdminButton;
