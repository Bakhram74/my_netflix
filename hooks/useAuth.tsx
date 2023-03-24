import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "@firebase/auth";
import {useRouter} from "next/router";
import {auth} from "@/firebase";

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
}
// const AuthContext = createContext<IAuth>({
//     user:null,
//     signUp:async ()=>{},
//     signIn:async ()=>{},
//     logout:async ()=>{},
//     error:null,
//     loading:false
// })
const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
})

export const AuthProvider=({children}:ReactNode)=>{
const [loading,setLoading] = useState(false)
const [error,setError] = useState<string>(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const [user,setUser] = useState<User|null>(null)
    const router = useRouter()
    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user)
                    setLoading(false)
                } else {
                    // Not logged in...
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }),
        [auth]
    )
    const signUp = async (email:string,password:string)=>{
    setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password)
            .then(userCredential=>{
                setUser(userCredential.user)
                router.push('/')
            }).catch(error=>alert(error.message))
            .finally(()=>setLoading(false))
    }
    const signIn = async (email:string,password:string)=>{
        setLoading(true)
        await signInWithEmailAndPassword(auth,email,password)
            .then(userCredential=>{
                setUser(userCredential.user)
                router.push('/')
            }).catch(error=>alert(error.message))
            .finally(()=>setLoading(false))
    }
    const logout = async ()=>{
        setLoading(true)
       await signOut(auth)
           .then(()=>setUser(null))
           .catch(error=>alert(error.message))
           .finally(()=>setLoading(false))
    }
    const memoValue = useMemo(
        () => ({ user, signUp, signIn, error, loading, logout }),
        [user, loading, error]
    )
            return (
            <AuthContext.Provider value={memoValue}>
                {children}
            </AuthContext.Provider>
            )

}

export const useAuth=()=>useContext(AuthContext)