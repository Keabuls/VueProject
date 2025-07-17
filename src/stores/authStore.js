import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { db,auth } from "@/utility/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { ROLE_ADMIN,ROLE_USER } from "@/constants/appConstants";


export const useAuthStore = defineStore("authStore",() => {

    const user = ref(null);
    const error = ref(null);
    const isLoading = ref(false); 
    const role = ref(null);


    const signUpUser = async (email, password) => {
        isLoading.value = true;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: userCredential.user.email,
                role: ROLE_USER,
                Id: userCredential.user.uid,
                createdAt: new Date(),
            });


            
            clearUser();
            
            error.value = null;

        }
        catch (err) {
            error.value = err.message;
            throw err; // Re-throw the error to handle it in the component
        }
        finally {
            isLoading.value = false;
        }

    }
    const clearUser = () => {
        user.value = null;
        role.value = null;
        user.Id = null;
    };


    const signInUser = async (email, password) => {
        isLoading.value = true;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            user.value = userCredential.user;
            user.role = ROLE_USER;
            user.Id = userCredential.user.uid;
            error.value = null;

        }
        catch (err) {
            error.value = err.message;
            throw err; // Re-throw the error to handle it in the component
        }
        finally {
            isLoading.value = false;
        }

    }




    return {
            user,
            error,
            role,
            clearUser,
            isLoading,
            signUpUser,
            signInUser,

        }

});