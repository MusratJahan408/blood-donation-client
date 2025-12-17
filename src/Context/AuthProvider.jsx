import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import axios from 'axios'; // axios ইমপোর্ট করতে ভুলবেন না

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                try {
                    // ফায়ারবেস ইউজারের ইমেইল দিয়ে ডাটাবেস থেকে ইউজারের তথ্য (রোলসহ) আনা হচ্ছে
                    const res = await axios.get(`http://localhost:3000/users/${currentUser.email}`);
                    
                    // ফায়ারবেস ডাটা + ডাটাবেস ডাটা (রোল) একসাথে মার্জ করে সেভ করা হচ্ছে
                    setUser({ ...currentUser, ...res.data });
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUser(currentUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const authInfo = {
        registerUser,
        signInUser,
        logOut,
        updateUserProfile,
        user,
        setUser,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}> {/* .Provider ব্যবহার নিশ্চিত করুন */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;