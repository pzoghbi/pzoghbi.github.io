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
                            <span className='SlideDown'>Achieve </span>
                            more
                            <br />
                            with<span className='SlideUp'> less</span>.
                        </p>
                    </div>
                    <div className="Slide">
                        <div>Get inspired</div>
                        <div>and take your</div>
                        <div>business to</div>
                        <div>the next level.</div>

                        <br />

                        <div className='FadeInWithDelay'>
                            <div>One decision will</div>
                            <div>get you there.</div>
                        </div>
                    </div>
                    <div className="Slide">
                        <div>Hello. I'm Phillip.</div>
                        <div className='FadeInWithDelay'>
                            I make <span className='colorize'> software</span>.
                        </div>
                    </div>
                    <div className="Slide">
                        <div className="Cascade">
                            <div className="FXSlideDelay1">I've created</div>
                            <div className="FXSlideDelay2">countless apps,</div>
                            <div className="FXSlideDelay3">tools, and games</div>
                            <div className="FXSlideDelay4">over the last</div>
                            <div className="FXSlideDelay5">10+ years.</div>
                        </div>
                    </div>
                    <div className="Slide">
                        <div>My specialty is</div>
                        <div>to make <strong>great</strong></div>
                        <div>software even</div>
                        <div><strong>greater</strong>.</div>
                    </div>
                    <div className="Slide">
                        <p>
                            Let's work<br /> together.
                        </p>
                    </div>
                    <div className="Slide">
                        <div className="CTA">
                            Are you hiring for
                            these positions?

                            <h5 className='Small-Margin-Bottom'>PRODUCT DESIGNER</h5>
                            <small>or a person who thinks they're in charge</small>

                            <h5 className='Small-Margin-Bottom'>WEB DEVELOPER</h5>
                            <small>
                                or a person who doesn't sleep until the code works
                            </small>
                            
                            <h5 className='Small-Margin-Bottom'>APPRENTICE CONSULTANT</h5>
                            <small>
                                or a person who accompanies you in a long-term journey
                            </small>
                        </div>
                        <br />
                        <a id="Contact" href="https://wa.me/385957421130" target="_blank" rel="noreferrer">Contact me</a>
                        <a id="Resume" href={`https://pzoghbi.github.io/${cv}`} target="_blank" rel="noreferrer">(or get my resume)</a>
                    </div>
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
