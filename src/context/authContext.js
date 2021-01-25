import React, { useContext, useState, useEffect } from 'react'
import {auth, db} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(firstname, lastname, email, password){
        var promise = auth.createUserWithEmailAndPassword(email, password).then( cred => {
            return db.collection('USERS').doc(cred.user.uid).set({
                firstname,
                lastname,
                email
            })
        })
        return promise
    }

    function signin(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        signin,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
