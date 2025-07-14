import {db} from '@/utility/firebaseConfig.js';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';

const productCollection = collection(db,'products');





export default {
    async createProduct(productData){
       const docRef = await addDoc(productCollection, productData);
       return {id: docRef.id, ...productData};
    },

    async getAllProducts() {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    },


    async getDocById(id) {
        const docRef = doc(db, 'products', id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            return {id: snapshot.id, ...snapshot.data()};
        } else {
            throw new Error('No such document!');
        }
    },

    async updateProduct(id, productData) {
        const docRef = doc(db, 'products', id);
        await updateDoc(docRef, productData);
        return {id, ...productData};
    },
    async deleteProduct(id) {
        const docRef = doc(db, 'products', id);
        await deleteDoc(docRef);
        return id;
    },
}


