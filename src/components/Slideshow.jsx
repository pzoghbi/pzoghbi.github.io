import { Link } from 'react-router-dom';
import wreath from '../svg/wreath.svg';

export default function Slideshow() {
    return (
        <div id="App-Slideshow">
            <div className="Slide" id="Slide-Landing">
                <div className="wreath">
                    <img id="wreath" src={wreath} alt="" />
                </div>
                <div>
                    <div><span className='SlideDown'>Achieve </span>more</div>
                    <div>with<span className='SlideUp'> less</span>.</div>
                </div>
            </div>
            <div className="Slide">
                <div className='text text-left'>
                    As a <b>full-stack developer</b>,
                    I create the entire user experience
                    for <b>software companies</b> so they can <b><u>win
                    the trust and loyalty of their clients</u></b>.
                </div>
            </div>
            <div className="Slide">
                <div className="navigation Cascade">
                    <div className='FXSlideDelay1 my-3'>
                        <a href='#' className='Link'>Blog</a>
                    </div>
                    <div className='FXSlideDelay2 my-3'>
                        <a href='#' className='Link'>Portfolio</a>
                    </div>
                    <div className='FXSlideDelay3 my-3'>
                        <a href='#' className='Link'>Testimonials</a>
                    </div>
                    <div className='FXSlideDelay4 my-3'>
                        <a href='#' className='Link'>Contact me</a>
                    </div>
                    <div className='FXSlideDelay5 my-3'>
                        <Link to="/about" className='Link'>About me</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}