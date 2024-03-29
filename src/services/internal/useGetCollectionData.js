import { getFirestore, doc, query, where, collection, getDocs, orderBy } from "firebase/firestore"

export const useGetCollectionData = ()=>{  
  const getCollectionData = async (idCollection)=>{
    try {        
      const db = getFirestore() 
      const queryDoc = doc(db, "products", "backpack collections")
      const queryCollection = collection(queryDoc, idCollection)
      const queryFilter = query(queryCollection, orderBy("id"), where("isActive", "==", true))          
      const collectionDataResponse = await getDocs(queryFilter)
      return collectionDataResponse.docs.length === 0 ? false : collectionDataResponse.docs.map(product=>product.data())                             
    } 
    
    catch (error) {       
      return false
    }       
  };

  return({
    getCollectionData
  })
}



