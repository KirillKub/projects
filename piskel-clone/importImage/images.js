
import paintBucketImg from '../assets/images/fill-drip.png';
import chooseColorImg from '../assets/images/icon-upload.png';
import pencilImg from '../assets/images/pencil.png';
import strokeImg from '../assets/images/stroke.png';
import eraserImg from '../assets/images/eraser-solid.svg';
import bucketImg from '../assets/images/bucket.png';
import menuImg from '../assets/images/Shape.png';
import menu2Img from '../assets/images/shape2.png';

export default function initImg(){
    let img = document.getElementById('paintBucketImg');
    img.src = paintBucketImg;
    let img2 = document.getElementById('chooseColorImg');
    img2.src = chooseColorImg;
    let img3 = document.getElementById('pencilImg');
    img3.src = pencilImg;
    let img4 = document.getElementById('strokeImg');
    img4.src = strokeImg;
    let img5 = document.getElementById('eraserImg');
    img5.src = eraserImg;
    let img6 = document.getElementById('bucketImg');
    img6.src = bucketImg;
    let img7 = document.getElementById('menuImg');
    img7.src = menuImg;
    let img8 = document.getElementById('menu2Img');
    img8.src = menu2Img;
}
