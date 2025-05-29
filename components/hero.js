"use client"
import Link from "next/link";

import { Button } from "./ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const Hero = () => {

    const imageRef = useRef();

    useEffect(()=>{
      const imageElement = imageRef.current;

      const handleScroll = ()=>{
          const scrollPosition = window.scrollY;
          const scrollThreshold = 100;

          if(scrollPosition > scrollThreshold){
             imageElement.classList.add("scrolled");
          }
          else{
            imageElement.classList.remove("scrolled");
          }
      }
      window.addEventListener("scroll",handleScroll);

      return () => window.removeEventListener("scroll",handleScroll);
    },[])


  return (
    <>
    <div>
      <div className="container items-center mx-auto text-center">
        <h2 className="text-5xl md:text-7xl mb-6 gradient font-extrabold tracking-tigher pr-2 pb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">
          Elevate your life through <br /> financial intelligence.
        </h2>
        <p className="text-xl dark:text-gray-400 mb-8 font-medium text-gray-600"> Unlock the power of AI to take control of your finances. Our smart platform tracks your spending, reveals patterns, and delivers real-time insights—helping you make confident decisions, achieve your goals, and build the future you deserve.</p>
      </div>

      <div className="flex justify-center space-x-4 mb-5">
        <Link href="/dashboard">
        <Button size={'lg'} className={'px-8 cursor-pointer  font-bold'}>
            Get Started
            <ChevronRight className="h-5 w-5"/>
        </Button>
        </Link>
      </div>
    </div>
    <div className="heroImageWrapper">
        <div ref={imageRef} className="hero-image">
    
       <Image src={'/banner.jpg'} alt="Dashboard Preview" className="rounded-md shadow-2xl border mx-auto" priority height={720} width={1280}></Image>
         </div>
    </div>
    </>
  );
};

export default Hero;
