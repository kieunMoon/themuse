import styles from "./TheMuseMain.module.css";
import  banner_midnight from './img/배너_미드나잇.jpg'
import  banner_opera from './img/배너_오페라의 유령.jpg'
import  banner_cats from './img/배너_캣츠.jpg'
import  banner_angel from './img/배너_천사에 관하여.jpg'
import  banner_interview from './img/배너_인터뷰.jpg'


var slideIndex = 0;
SlideBanner();

function SlideBanner () {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(SlideBanner, 2000); // Change image every 2 seconds

    return(
        <div>
            <div className={styles.silder}>
            <img className={styles.mySlides} src={banner_midnight} alt='배너 이미지' />
            <img className="mySlides" src={banner_cats} alt='배너 이미지' />
            <img className="mySlides" src={banner_opera} alt='배너 이미지' />
            <img className="mySlides" src={banner_angel} alt='배너 이미지' />
            <img className="mySlides" src={banner_interview} alt='배너 이미지' />
            </div>
        </div>
    );
}

export default SlideBanner;
