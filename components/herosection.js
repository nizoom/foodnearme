import React from "react";
import Image from 'next/Image'
import darkDonut from '../media/darkdonut.png'
import Maindish from '../media/maindish.png'
import Sushibox from '../media/sushibox.png'
import Pinkdonut from '../media/pinkdonut.png'
import Donutdish from '../media/donutdish.png'

const HeroSection = (props) => {
    return(
        <div className = 'hero-wrapper'>
                     
          <div className = 'darkdonut-wrapper'>
            <Image src = {darkDonut} className = 'darkdonut' layout = '' priority fixed = '1x'/>
          </div>
          
            <div className = 'hero-text-wrapper'>
                <h2 className = 'main-hero-text'> Find food based on your favorite cuisines with just a click.</h2>

                <p className= 'supporting-hero-text'> Discover new amazing restaurants using a worldwide database. We’ll find quality options no matter where you are on the globe.</p>

            </div>
            <div className = 'maindish-wrapper'>
                <Image src = {Maindish} className = 'maindish' layout = '' priority fixed = '1x'/>
            </div>
            <div className = 'donutdish-wrapper'>
                <Image src = {Donutdish} className = 'donutdish' layout = '' priority fixed = '1x'/>
            </div>
            <div className = 'sushibox-wrapper'>
                <Image src = {Sushibox} className = 'sushibox' layout = '' priority fixed = '1x'/>
            </div>
            <div className = 'pinkdonut-wrapper'>
                <Image src = {Pinkdonut} className = 'pinkdonut' layout = '' priority fixed = '1x'/>
            </div>
        </div>
    )
}

export default HeroSection;