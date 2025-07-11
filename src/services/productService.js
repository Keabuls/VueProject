import {db} from '@/utility/firebaseConfig.js';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';

const productCollection = collection(db,'products');





export default {
    async createProduct(productData){
       const docRef = await addDoc(productCollection, productData);
       return {id: docRef.id, ...productData};
    }
}
