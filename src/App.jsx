import './App.css';
import { useEffect } from 'react';
import wreath from './svg/wreath.svg';
import cv from './files/Phillip Zoghbi CV resume zivotopis 2022.pdf';

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
let swipeMinDistance = 50;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const slideshowScroll = () => {
    document.getElementById("App-Slideshow").style.top = '-' + (100 * slideIndex) + 'vh';

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

    setInterval(() => { canScroll = true }, 2000);

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

function App() {
    useEffect(() => {
        let slidesElem = document.getElementsByClassName('Slide');
        instructionsDiv = document.getElementById('Instructions');
        slideCount = slidesElem.length;
        [...slidesElem].forEach((elem) => { observer.observe(elem); });
    }, []);

    return (
        <div className="App">
            <div className='App-Frame'
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onWheel={onWheel}>
                <div id="App-Slideshow">
                    <div className="Slide" id="Slide-Landing">
                        <div className="wreath">
                            <img id="wreath" src={wreath} alt="" />
                        </div>
                        <p>
                            <span className='jsSlideDown'>Achieve </span>
                            more
                            <br />
                            with<span className='jsSlideUp'> less</span>.
                        </p>
                    </div>
                    <div className="Slide" id="Slide-2">
                        Hello. I'm Phillip.
                    </div>
                    <div className="Slide">
                        <p>
                            I make <span className='colorize'> software</span>.
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            I've created
                            <br />
                            countless apps,
                            <br />
                            tools, and games
                            <br />
                            over the last
                            <br />
                            10+ years.
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            {/* Enhancing<br />good and great<br />software is now<br />my specialty. */}
                            My specialty is
                            <br />
                            to make great
                            <br />
                            software even
                            <br />
                            greater.
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            Let's work<br /> together.
                            <br />
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            <small>
                                Are you hiring for
                                <br />
                                these positions?
                                <br />
                                <br />
                                <br />
                                PRODUCT DESIGNER
                                <br />
                                WEB DEVELOPER
                                <br />
                                CONSULTATNT
                            </small>
                            <br />
                            <br />
                            <br />
                            <a id="Contact" href="https://wa.me/385957421130" target="_blank" rel="noreferrer">Contact me</a>
                            <br />
                            <a id="Resume" href={`https://pzoghbi.github.io/${cv}`} target="_blank" rel="noreferrer">or get my resume</a>
                            <br/>
                        </p>
                    </div>
                    {/* <div className="Slide">
                        <form action="https://api.web3forms.com/submit" method="POST">

                        <input type="hidden" name="access_key" value="877d0ead-7a53-400e-9d0b-e27045f4b17d" />

                        <input type="text" name="name" required />
                        <input type="email" name="email" required />
                        <textarea name="message" required></textarea>
                        <input type="hidden" name="redirect" value="https://web3forms.com/success" />

                        <button type="submit">Submit Form</button>

                        </form>
                    </div> */}
                </div>

                <div id="Instructions" className='FirstSlide'>
                    <span className='Swipe-arrow'>︽</span>
                    <span id="Tooltip">Swipe up</span>
                </div>
            </div>
        </div>
    );
}

export default App;
