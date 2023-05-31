import { useEffect, useState } from "react";
import styles from 'C:/javascript/the-muse/src/detail/detail.module.css';
import axios from "axios";
import jwt_decode from "jwt-decode";




function Comment ({history, musicalIdx}) {
   
    const [commentContent, setCommentContent ] = useState('');
    const [commentList, setCommentList] = useState([]);

    const handlerChangeContents = e => setCommentContent(e.target.value);
    let userNickname = (jwt_decode(sessionStorage.getItem('token'))).userNickname;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decodedToken = jwt_decode(token);

        axios.get(`http://localhost:8080/themuse/musicaldetail/${musicalIdx}/getcomment`)
            .then(response => {
                console.log(response);
                setCommentList(response.data);
            })
            .catch(error => console.log(error));

    }, []);




    const handlerSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:8080/themuse/musicaldetail/${musicalIdx}/insertcomment`,
        { commentContent ,userNickname,musicalIdx })	
            .then(response => {								   
                console.log(response);
                alert("댓글이 등록되었습니다.");
                window.location.replace(`/themuse/musicaldetail/${musicalIdx}`);

            })
            .catch(error => {
                console.log(error);
                alert(`댓글이 등록에 실패했습니다.  (${error.message})`);
                return;
            });
    };


    const handlerDelete = (commentIdx,userNicknameC) => {
        if (userNicknameC != userNickname) {
            alert('작성자만 삭제할 수 있습니다.');
            console.log(userNickname);
        
            return;
        }
        axios.put(`http://localhost:8080/themuse/musicaldetail/${commentIdx}/deletecomment`)
        .then(response => {
                                                   
            console.log(response);
            if (response.data === 1) {                              
                alert('댓글이 삭제되었습니다.');
                window.location.replace(`/themuse/musicaldetail/${musicalIdx}`);      
            } else { 
                alert('삭제에 실패했습니다.');
                return;
            }
        })
        .catch(error => {                                           
            console.log(error);
            alert(`삭제에 실패했습니다. (${error.message})`);
            return;
        });
    };

    return (
        <>
            {/* <!--리뷰--> */}
            <div className={styles.reviews}>

                { /*리뷰작성*/}
                <div className={styles.reviewWrite}>
                    <p>리뷰 작성</p>
                </div>

                <form id="frm" name="frm" onSubmit={handlerSubmit}>           </form>
                <div className={styles.inputreview} >
                    <input type="text" id="commentContent" className={styles.reviewwrite} onChange={handlerChangeContents} />
                    <input type="button" id="submit" className={styles.finish} onClick={handlerSubmit} value="등록" />
                </div>
                {
                    commentList && commentList.map(comment => (
                        <>
                        <div className={styles.reviewBox}>
                            <div className={styles.nickName}>
                                <p>작성자 : {comment.userNickname}</p>
                            </div>
                            <div className={styles.date}>
                                <p>{comment.commentDt}</p>
                            </div>
                            <div className={styles.comment}>
                                <p> {comment.commentContent}</p>
                            </div>
                            <div className={styles.btn}>
                            <input type="button" id="submit" className={styles.delete} onClick={() => handlerDelete(comment.commentIdx, comment.userNickname)} value="삭제" />
                            </div>
                        </div>    
                        </>
                    ))
                }

            </div>
        </>
    );

}

export default Comment;