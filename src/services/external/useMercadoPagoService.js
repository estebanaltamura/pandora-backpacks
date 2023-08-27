export const useMercadoPagoService = ()=>{  
  const getUrl = async (items)=>{
    const endPoint = "https://www.encrypted-chat-backend.online:5000/createOrder"  
    
    try{
      const data = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        mode: 'cors',        
        
        body: JSON.stringify({
          items
        })
      })
  
      if(data.status === 200){
        const json = await data.json()
        return json
      }
      else return false;   
    }
    catch(error){
      return false      
    }
  }  
    
  return({
    getUrl    
  })
}