import React, {useState} from 'react';
import Head from "next/head";
import Image from 'next/image'

const Login = () => {
    const [login, setLogin] = useState(false)
    const contentfulLoader = ({ src, quality, width }) => {
        const params = [`w=${width}`];

        if (quality) {
            params.push(`q=${quality}`);
        }

        return `${src}?${params.join('&')}`;
    };
    return (
        <div className={'relative flex flex-col bg-black h-screen w-screen md:items-center md:justify-center md:bg-transparent'}>
            <Head>
                <title>Netflix</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Image
                fill
                src="https://rb.gy/p2hphi"
                className="-z-10 !hidden w-screen object-cover opacity-60 sm:!inline"
                alt={''}
                loader={contentfulLoader}
            />
            <img
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
            />
            <form className={'relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0' +
                'md:max-w-md md:px-14'} >
                <h1 className={'text-4xl font-semibold'}>Sign In</h1>
                <div className={'space-y-4'}>
                    <label className={'w-full inline-block'}>
                        <input type="email" placeholder={'Email'} className={'input'}/>
                    </label>
                    <label className={'w-full inline-block'}>
                        <input type="password" placeholder={'Password'} className={'input'}/>
                    </label>
                </div>
                <button type={'submit'} className={'w-full bg-[#e50914] rounded py-3 font-semibold'}>Sign In</button>
<div className={'text-[gray]'}>
    New to Netflix?{' '}
    <button className={'text-white hover:underline'}>Sign up now</button>
</div>
            </form>
        </div>
    );
};

export default Login;