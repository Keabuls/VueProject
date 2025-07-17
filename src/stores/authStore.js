import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { db,auth } from "@/utility/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


export const useAuthStore = defineStore("authStore",() => {

    const user = ref(null);
    const error = ref(null);
    const isLoading = ref(false); 


    const signUpUser = async (email, password) => {
        isLoading.value = true;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user.value = userCredential.user;
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
            isLoading,
            signUpUser,

        }

});