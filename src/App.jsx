import './App.css';
import { useEffect } from 'react';
import Slideshow from './components/Slideshow';

let options = {
    root: document.getElementById('App-Frame'),
    rootMargin: '0px',
    threshold: .5
}

let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let elem = entry.target;
        if (entry.isIntersecting) { elem.classList.add('active') }
        else { elem.classList.remove('active') }
    });
}, options)

let instructionsDiv = (null);
let slideCount = 0;
let slideIndex = 0;
let touchY = (null);
let swipeMinDistance = 30;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const slideshowScroll = () => {
    document.getElementById("App-Slideshow").style.top = '-' + (100 * slideIndex) + '%';

    instructionsDiv.style.opacity = 1;

    if (slideIndex === 0) {
        instructionsDiv.classList.add('FirstSlide')
    } else if (slideIndex < slideCount - 1) {
        instructionsDiv.classList.remove('FirstSlide')
    } else {
        instructionsDiv.style.opacity = 0;
    }
}

let canScroll = true;
const onWheel = (e) => {
    if (!canScroll) return;

    canScroll = false;

    if (e.deltaY > 0) {
        slideIndex = clamp(slideIndex + 1, 0, slideCount - 1);
    } else {
        slideIndex = clamp(slideIndex - 1, 0, slideCount - 1);
    }

    setTimeout(() => { canScroll = true }, 1000);

    slideshowScroll();
}
const onTouchStart = (e) => { touchY = e.touches[0].clientY };
const onTouchEnd = (e) => {
    let changedTouchY = e.changedTouches[0].clientY;
    if (Math.abs(touchY - changedTouchY) < swipeMinDistance) { return; }

    if (touchY - changedTouchY > swipeMinDistance) {
        slideIndex = clamp(slideIndex + 1, 0, slideCount - 1);
    } else {
        slideIndex = clamp(slideIndex - 1, 0, slideCount - 1);
    }

    slideshowScroll();
};

const resizeCarousel = () => {
    let carouselFrame = document.getElementById('CarouselFrame');
    let carouselSlides = document.getElementsByClassName('CarouselSlide');
    let tallestSlide = carouselSlides[0];

    // Store tallest element
    [...carouselSlides].forEach(el => {
        if (el.offsetHeight >= tallestSlide.offsetHeight) {
            tallestSlide = el;
        }
    });

    // Match height of all elements to tallest
    [...carouselSlides].forEach(el => {
        el.style.height = tallestSlide.offsetHeight + 'px';
    });

    carouselFrame.style.height = tallestSlide.offsetHeight + 'px';
}

const startCarousel = () => {
    let carouselIndex = 0;
    setInterval(() => {
        let carousel = document.getElementById('Carousel');
        let carouselFrame = document.getElementById('CarouselFrame');
        let slides = document.getElementsByClassName('CarouselSlide');
        carouselIndex = (++carouselIndex) % slides.length;
        carousel.style.top = -(carouselIndex * carouselFrame.offsetHeight) + 'px';
    }, 5000)
}

function App() {
    useEffect(() => {
        let slidesElem = document.getElementsByClassName('Slide');
        instructionsDiv = document.getElementById('Instructions');
        slideCount = slidesElem.length;
        [...slidesElem].forEach((elem) => { observer.observe(elem); });
        // resizeCarousel();
        // startCarousel();
    }, []);

    return (
        <div className="App">
            <div className='App-Frame' onTouchStart={onTouchStart} 
                onTouchEnd={onTouchEnd} onWheel={onWheel}>
                <Slideshow />

                <div id="Instructions" className='FirstSlide'>
                    <span className='Swipe-arrow'>︽</span>
                    <span id="Tooltip">Swipe up</span>
                </div>
            </div>
        </div>
    );
}

export default App;
