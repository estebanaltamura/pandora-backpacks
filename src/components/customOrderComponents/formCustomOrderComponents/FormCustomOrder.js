import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { CartContext } from "../../../contexts/CartContextProvider";
import { IsLoadingContext } from "../../../contexts/IsLoadingContextProvider";
import { useFormInfoValidator} from '../../../hooks/useFormInfoValidator'
import { TbHelp } from "react-icons/tb";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./FormCustomOrder.css"

export const FormCustomOrder = ()=>{
  const { fullNameValidator, telephoneValidator,  mailValidator, resetAlerts, fullNameAlert, phoneAlert, mailAlert } = useFormInfoValidator()
  const { cartItems, dispatch } = useContext(CartContext)
  const {setIsLoading} = useContext(IsLoadingContext)

  const history = useNavigate()
  const MySwal = withReactContent(Swal)

  const onSubmitHandler = (e)=>{
    e.preventDefault()        

    const fullNameValue = e.target.fullName.value
    const phoneValue = e.target.phone.value
    const mailValue = e.target.mail.value
        
    fullNameValidator(fullNameValue)
    telephoneValidator(phoneValue)
    mailValidator(mailValue)
        
    if(fullNameValidator(fullNameValue) && telephoneValidator(phoneValue) && mailValidator(mailValue)){
      setIsLoading(true)
      const db = getFirestore()
      const queryCollection = collection(db, "orders")
      const queryFilter = query(queryCollection, orderBy("orderId", "desc"))
                        
      getDocs(queryFilter).then(res=>{
        let lastOrderIdNumber
        if (res.docs.length > 0){
          lastOrderIdNumber = res.docs[0].data().orderId
          lastOrderIdNumber++
        }
                
        addDoc(queryCollection, {internalOrderId: lastOrderIdNumber || 1, fullname: fullNameValue,  phoneNumber: phoneValue, isActive: true, email: mailValue, ...cartItems}).then(res=>{
          dispatch({type: "CLEAR_CART"})
          history(`/orderCreated/${res.id || 1}`)   
          setIsLoading(false)                
        
        }).catch(error=>{
          setIsLoading(false)  
          console.log(error)
          MySwal.fire("We can't process your order at this time")
        })    
      
      }).catch(error=>{
        console.log(error)
        setIsLoading(false)
      })            
    }        
  }

  const onClickHandlerHelpIcon = ()=> {
    MySwal.fire({
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'ok',
      html: <div>
              <h4>US phone number formats:</h4>
              <span>Option 1: 555-555-5555</span><br/>
              <span>Option 2: 1 555-555-5555</span><br/>
              <span>Option 3: 1 (555) 555-5555</span><br/>
              <span>Option 4: 15555555555</span><br/>
              <span>Option 5: 5555555555</span>
            </div>            
      })
  }

  return(
    <>                
      <div className="loginContainer"> 
        <div className="form-container"> 
          <form action="/action_page.php" onSubmit={onSubmitHandler}> 
                                
            <div className="inputContainer">
              <span className="subtitle">FULL NAME:</span>
              <input autoComplete="off" type="text" name="fullName" onKeyUp={resetAlerts} />
              <span className="inputAlerts">{fullNameAlert}</span>
            </div>

            <div className="inputContainer">
              <span className="subtitle">PHONE:</span>  
              <input autoComplete="off" type="text" name="phone" onKeyUp={resetAlerts} />
              {phoneAlert && <TbHelp className="helpIcon" onClick={onClickHandlerHelpIcon}/>}
              <span className="inputAlerts">{phoneAlert}</span>
            </div>
                                    
            <div className="inputContainer">
              <span className="subtitle">MAIL:</span>  
              <input autoComplete="off" type="text" name="mail" onKeyUp={resetAlerts} />
              <span className="inputAlerts">{mailAlert}</span>
            </div>
                                    
            <button type="submit"  className="submit-btn">CREATE ORDER</button>
          </form>
        </div>  
      </div>            
    </>
  )
}