import styles from './TheMuseMain.module.css';
import { useEffect, useState } from "react";
import { Link, Route } from 'react-router-dom';
import axios from "axios";
import OpenData from "./OpenData";
import SimpleSlider from "./SimpleSlider";





function TheMuseMain () {
    
    const image = `http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/api/getImage/`;
    const [rankingDatas, setRankingDatas] = useState([]);
    const [mdPickDatas, setMdPickDatas] = useState([]);


    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/themuse/main/rank`)
        .then(response => {
            console.log(response);
            setRankingDatas(response.data);
        })
        .catch(error => console.log(error));

        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/themuse/main/pick`)
        .then(response => {
            console.log(response);
            setMdPickDatas(response.data);
        })
        .catch(error => console.log(error));
    },[])

    return (

    <div className={styles.back}>  
       

        <div className={styles.silder}>
          <SimpleSlider/>
            </div>

        <section className={styles.section02}>
            <OpenData />
        </section>

        <section className={styles.section02}>
            <div>
                <p class={styles.title}>랭킹</p>
            </div>        
            <div className={styles.mList}>
            { rankingDatas && rankingDatas.map(rankingDatas => (
                <Link to = {`/themuse/musicaldetail/${rankingDatas.musicalIdx}`}>
                <div className={styles.post}>
                
                <img className={styles.postImg} src= {image + rankingDatas.musicalImg} />
                
                <p className={styles.contents1_bold}>{rankingDatas.musicalName}</p>
                </div>
                </Link>
            ))
            }
            </div>
        </section>  

        <section class={styles.section02}>
            <div>
                <p class={styles.title}>MD's Pick</p>
            </div>
            <div className={styles.mList}>
            { mdPickDatas && mdPickDatas.map(mdPickDatas => (
                <Link to ={`/themuse/musicaldetail/${mdPickDatas.musicalIdx}`}>
                <div className={styles.post}>
                <img className={styles.postImg} src= { image + mdPickDatas.musicalImg} />
                <p className={styles.contents1_bold}>{mdPickDatas.musicalName}</p>
                <p className={styles.period}>{mdPickDatas.musicalIntro}</p>
                </div>
                </Link>
            ))
            }     
            </div>      
        </section>

       
</div> 
    )
}


export default TheMuseMain;