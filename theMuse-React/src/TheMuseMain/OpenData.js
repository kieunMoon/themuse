import styles from "./TheMuseMain.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OpenData () {

    const [openDatas, setOpenDatas] = useState([]);
    const [DDays, setDDays] = useState([]);
    const today = new Date();
    
    const image = `http://localhost:8080/api/getImage/`;


    useEffect(() => {
        
        axios.get('http://localhost:8080/themuse/main/open')
        .then(response => {
            console.log(response);
            setOpenDatas(response.data);
            setDDays((Math.floor(response.data.musicalStartperiod-today) / (1000*60*60*24))) ;
            console.log(DDays);
        })
        .catch(error => console.log(error));

    },[])
    
    return (
    <>

        <section className={styles.section02}>
            <div>
                <p className={styles.title}>공연 예정</p>
            </div>        
            <div className={styles.mList}>
            { openDatas && openDatas.map(openDatas => (
                <Link to={`/themuse/musicaldetail/${openDatas.musicalIdx}`} >
                <div className={styles.post}>
                <img className={styles.postImg} src= {image+ openDatas.musicalImg} />
                <p className={styles.contents1_bold}>{openDatas.musicalName}</p>
                <p className={styles.period}>{openDatas.musicalStartperiod} ~ {openDatas.musicalEndperiod}</p>
                <div className={styles.donutdday}>D- { Math.floor((Date.parse(openDatas.musicalStartperiod)-today) / (1000*60*60*24))}</div>
               </div>
               </Link>
            ))
            }
            </div>
        </section>  
   
    </>
    )
    }
    
    export default OpenData;