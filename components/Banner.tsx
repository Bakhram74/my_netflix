import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Movie} from "@/typing";
import {baseUrl} from "@/constans/movie";
import Image from "next/image"
import { FaPlay } from 'react-icons/fa';
import {InformationCircleIcon} from "@heroicons/react/solid";
import {useRecoilState} from "recoil";
import {modalState} from "@/atoms/modalAtom";
interface BannerProps{
    netflixOriginals:Movie[]
}

const Banner = ({netflixOriginals}:BannerProps) => {
    const [movie,setMovie] = useState<Movie|null>(null)
    const [currentMovie,setCurrentMovie] = useState<Movie|null>(null)
    const [showModal,setShowModal] = useRecoilState(modalState)
    useLayoutEffect(()=>{
        setMovie(netflixOriginals[Math.floor(Math.random()*netflixOriginals.length)])
    },[netflixOriginals])

    return (
        <div className={'flex flex-col space-y-2  py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'}>
<div className={'absolute top-0 left-0 w-screen -z-10 h-[95vh]'}>
    <Image
        fill
        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        className={'object-cover'}
     alt={''}/>
</div>
            <h1 className={'text-2xl font-bold md:text-4xl lg:text-7xl md:space-y-24'}>
                {movie?.title||movie?.name||movie?.original_name}</h1>
        <p className={'max-w-xs text-xs drop-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'}>
            {movie?.overview}
        </p>
            <div className={'flex space-x-3'}>
                <button className={'bannerButton'}>
                    <FaPlay className={'h-4 w-4 text-black md:w-7 md:h7'}/>Play</button>
                <button className={'bannerButton bg-[gray]/70'}
                onClick={()=>{
                        setShowModal(true)
                    setCurrentMovie(movie)
                }}>
                    More Info <InformationCircleIcon className={'h-5 w-5 md:w-8 md:h8'}/>
                </button>
            </div>
        </div>
    );
};

export default Banner;