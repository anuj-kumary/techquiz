import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebaseConfig";

export const signinServices = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const signupServices = async (name: string, email: string, password: string) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            email,
            quizzes: [],
            totalScore: 0
        })
        return response
    } catch (error) {
        console.error(error)
    }
}


export const logout = () => {
    signOut(auth);
};
