import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {modalState, movieState} from "@/atoms/modalAtom";
import {XIcon} from '@heroicons/react/outline';
import Element, {Genre} from './../typing'
function Modal() {
    const movie = useRecoilValue(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const handleClose = () => {
        setShowModal(false)
    }

    useEffect(() => {
        if (!movie) {
            return
        }

        async function fetchMovie() {
            const data = await fetch(`https://api.themoviedb.org/3/${
                movie?.media_type === 'tv' ? 'tv' : 'movie'
            }/${movie?.id}?api_key=${
                process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`)
                .then(response => response.json())
                .catch(error => console.log(error.message))

            if (data.videos.results) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                    setTrailer(data.videos.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
        console.log(genres)
        console.log(trailer)
    }, [movie])
    return (
        <div>
            <button
                className="modalButton absolute right-5 top-5 !z-50 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                onClick={handleClose}
            >
                <XIcon className="h-6 w-6"/>
            </button>
        </div>


    );
}


export default Modal;