import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import Head from "next/head";
import Image from 'next/image'
import {useAuth} from "@/hooks/AuthProvider";

type Inputs = {
    email: string,
    password: string,
};

const Login = () => {
    const [login, setLogin] = useState(false)
    const{signIn,signUp}=useAuth()
    const { register,handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email,password}) => {
        if(login){
             await signIn(email,password)
        }else {
            await signUp(email,password)
        }
    };
    const contentfulLoader = ({src, quality, width}:any) => {
        const params = [`w=${width}`];

        if (quality) {
            params.push(`q=${quality}`);
        }

        return `${src}?${params.join('&')}`;
    };
    return (
        <div
            className={'relative flex flex-col bg-black h-screen w-screen md:items-center md:justify-center md:bg-transparent'}>
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
                'md:max-w-md md:px-14'}
                  onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className={'text-4xl font-semibold'}>Sign In</h1>
                <div className={'space-y-4'}>
                    <label className={'w-full inline-block'}>
                        <input type="email" placeholder={'Email'} className={`input ${
                            errors.email && 'border-b-2 border-orange-500'
                        }`}
                             defaultValue={'email'}  {...register("email", {required: true})}
                        />
                        {errors.email && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Please enter a valid email.
                            </p>
                        )}
                    </label>
                    <label className={'w-full inline-block'}>
                        <input type="password" placeholder={'Password'} className={`input ${
                            errors.password && 'border-b-2 border-orange-500'
                        }`}
                               {...register("password", {required: true, minLength: 8, maxLength: 60})}
                        />
                        {errors.password && (
                            <p className="p-1 text-[13px] font-light  text-orange-500">
                                Your password must contain between 8 and 60 characters.
                            </p>
                        )}
                    </label>
                </div>
                <button className={'w-full bg-[#e50914] rounded py-3 font-semibold'}
                onClick={()=>setLogin(true)}
                >Sign In
                </button>
                <div className={'text-[gray]'}>
                    New to Netflix?{' '}
                    <button type={'submit'} className={'text-white hover:underline'}
                            onClick={()=>setLogin(false)}
                    >Sign up now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;