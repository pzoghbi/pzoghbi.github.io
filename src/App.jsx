import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { isDisabled } from '@testing-library/user-event/dist/utils';

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

let slideCount = 0
let slideIndex = 0
let touchY = (null)
let swipeMinDistance = 50

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const slideshowScroll = () => {
    document.getElementById("App-Slideshow").style.top = '-' + (100 * slideIndex) + 'vh';
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
        slideCount = slidesElem.length;
        [...slidesElem].map((elem, i) => {
            observer.observe(elem);
        })
    }, []);

    return (
        <div className="App">
            <div className='App-Frame'>
                <div id="App-Slideshow" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <div className="Slide" id="Slide-Landing">
                        <p>
                            <span className='jsSlideDown'>Achieve </span>
                            more<br />
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
                            I've created<br /> countless apps,<br /> tools, and games<br /> over the last<br />10+ years.
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            Improving both<br />good and great<br />software is now<br />my specialty.
                        </p>
                    </div>
                    <div className="Slide">
                        <p>
                            Take a step in<br />the right direction.
                            <br/>
                            <span className='jsFadeIn'>One decision will<br />get you there.</span>
                        </p>
                    </div>

                </div>

                <div className="Instructions">
                    <span className='Swipe-arrow'>︽</span>
                    <span id="Tooltip">Swipe up</span>
                </div>
            </div>
        </div>
    );
}

export default App;
