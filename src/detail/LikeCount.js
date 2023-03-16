import { useEffect, useState }from "react";
import styles from './detail.module.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Icon } from '@iconify/react';


function LikeCount({history, musicalIdx}) {
    

    const [likeUpdate, setLikeUpdate] = useState(false)
    const [musicalLikeCt, setMusicalLikeCt] = useState(0) 
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        setUserNickname(decodedToken.userNickname);

        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/themuse/musicaldetail/${musicalIdx}/getlike`)
            .then(response => {
                console.log(response);
                setMusicalLikeCt(response.data.musicalLikeCt);
            })
            .catch(error => console.log(error));
    }, []);

    const likeUpdateHandler = () => {
        setLikeUpdate(!likeUpdate)
      }

    const LikeCountHandler = () => {
        likeUpdateHandler()
        
    if (!likeUpdate) {
        setMusicalLikeCt(musicalLikeCt +1)
        axios.put(`http://${process.env.REACT_APP_REST_API_SERVER_IP}:${process.env.REACT_APP_REST_API_SERVER_PORT}/themuse/musicaldetail/${musicalIdx}/like`, 
        {musicalIdx})
        .then(response => {                           
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            return;
        });
    } else if (likeUpdate) {
        setMusicalLikeCt(musicalLikeCt -1)
        axios.put(`http://localhost:8080/themuse/musicaldetail/${musicalIdx}/unlike`, 
        {musicalIdx})
        .then(response => {                           
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            return;
        });
    }} 

    return(
        <>
        <div className={styles.likesBox}>
         <h1 className={styles.likes}> Likes  {musicalLikeCt} </h1>
         <br/>
        {likeUpdate ?
          <button onClick={LikeCountHandler}><Icon className={styles.heart} icon="material-symbols:heart-plus" /></button>:
          <button onClick={LikeCountHandler}><Icon className={styles.heart} icon="material-symbols:heart-minus-outline" /></button>
        }
        </div>
        </>
    );
}

export default LikeCount;