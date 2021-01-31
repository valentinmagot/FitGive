import React, { useContext, useState, useEffect } from 'react'
import {auth, db, storage} from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [currentUserInfo, setCurrentUserInfo] = useState()
    const [loading, setLoading] = useState(true)

    function signup(firstname, lastname, initial, email, password){
        var promise = auth.createUserWithEmailAndPassword(email, password).then( cred => {
            const code = cred.user.uid.toString().substr(0, 4)
            const collection = db.collection('USERS').doc(cred.user.uid).collection('FRIENDS').doc().set({
                code,
                initial,
                firstname,
                lastname
            })
            const info = db.collection('USERS').doc(cred.user.uid).set({
                code,
                initial,
                firstname,
                lastname,
                email
            })
            return collection, info

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

    function getUserInfo(user){
        if(user){
            db.collection("USERS").doc(user.uid)
            .get()
            .then(function(doc) {
                setCurrentUserInfo(doc.data())
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }
        
    }
    


    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            getUserInfo(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        currentUserInfo,
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
