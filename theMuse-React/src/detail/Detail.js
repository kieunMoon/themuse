import { useEffect, useState } from "react";
import styles from 'C:/javascript/the-muse/src/detail/detail.module.css';
import axios from "axios";
import Comment from "./Comment";
import LikeCount from "./LikeCount";

function Detail ({history, match}) {
    const {musicalIdx} = match.params;

    const [ details, setDetails ] = useState([]);
    const [ musicalName, setMusicalName ] = useState('');
    const [ musicalActor, setmusicalActor ] = useState('');
    const [ musicalRunningtime, setMusicalRunningtime ] = useState('');
    const [ musicalPrice, setMusicalPrice ] = useState('');
    const [ musicalImg, setMusicalImg ] = useState('');
    const [ musicalStartperiod, setMusicalStartperiod ] = useState('');
    const [ musicalEndperiod, setMusicalEndperiod ] = useState('');
    const [ commentContent, setCommentContent ] = useState('');
    const [ musicalDetailImg, setMusicalDetailImg ] = useState('');
    const image = `http://localhost:8080/api/getImage/`;

    useEffect(() => {
        console.log(match);
        axios.get(`http://localhost:8080/themuse/musicaldetail/${musicalIdx}`)
        .then(response => {
            console.log(response);
            setDetails(response.data);
            setMusicalName(response.data.musicalName);
            setmusicalActor(response.data.musicalActor);
            setMusicalRunningtime(response.data.musicalRunningtime);
            setMusicalPrice(response.data.musicalPrice);
            setMusicalImg(response.data.musicalImg);
            setMusicalDetailImg(response.data.musicalDetailImg);
            setMusicalStartperiod(response.data.musicalStartperiod);
            setMusicalEndperiod(response.data.musicalEndperiod);
            setCommentContent(response.data.commentContent);
        })
        .catch(error =>  {
            console.log(error);
            if(error.response.status ===403) {
                alert('접근 권한이 없습니다. 로그인 후 다시 시도하세요');
                history.push('/login');
            } 
        });
        
    }, []);


    return (


        <div className={styles.back2}>

            {/* 뮤지컬 이름 */}
            <p className={styles.name}>{musicalName}</p>

            <div className={styles.box}>
                <div className={styles.boxL}>
                    {/* 포스터 */}
                    <img className={styles.poster} src={image + musicalImg}/>
                    {/* {/* <!--좋아요 하트--> */}
                    <div className={styles.heartSection}>

                        {/* <HeartButton /> */}
                    </div>
                </div>
                <div className={styles.boxR}>
                    {/* <!--공연 정보--> */}
                    <ul className={styles.info}>
                        <li>출연 배우<p>{musicalActor}</p></li>
                        <li>관람 시간<p>{musicalRunningtime}분</p></li>
                        <li>가격<p>{musicalPrice}원</p></li>
                        <li>공연 기간<p>{musicalStartperiod}~{musicalEndperiod}</p></li>
                        {/* <!--좋아요 하트-->*/}
                        <div className={styles.heartSection}>
                            <LikeCount musicalIdx={musicalIdx} />
                        </div>
                    </ul>
                </div>

            </div>

            <div className={styles.box2}>




                {/* <!--상세정보&리뷰 카테고리박스 1--> */}
                <div className={styles.tagOne} >
                    <div className={styles.tag1}>
                        <p>상세정보</p>
                    </div>

                    <div className={styles.tag2}>
                        <p>리뷰</p>
                    </div>

                    {/* <!--구분선1--> */}
                    <hr className={styles.hr1} />
                </div>

                {/* <!--상세정보 이미지--> */}
                <div className={styles.imgbox}>
                <img className= {styles.detailimg} src={image + musicalDetailImg}/>
                </div>

                {/* <!--상세정보&리뷰 카테고리박스 2--> */}
                <div className={styles.tagTwo}>
                    <div className={styles.tag3}>
                        <p>상세정보</p>
                    </div>

                    <div className={styles.tag4}>
                        <p>리뷰</p>
                    </div>

                    {/* <!--구분선2--> */}
                    <hr className={styles.hr2} />
                </div>
            </div>
            <div className={styles.box4}>
                <Comment musicalIdx={musicalIdx} />
            </div>
        
        </div>

    );
}

export default Detail;