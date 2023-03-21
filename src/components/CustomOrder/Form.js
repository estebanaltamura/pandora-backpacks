import { useLoginValidator } from "./useLoginValidator"
import { getFirestore, collection, addDoc, getDocs, getDoc, where, orderBy, query } from "firebase/firestore";
import { useContext } from "react";
import { CartContext } from "../Contexts/CartContextProvider";
import { TbHelp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./Form.css"

export const Form = ()=>{

    const { fullNameValidator, telephoneValidator,  mailValidator, resetAlerts, fullNameAlert, phoneAlert, mailAlert } = useLoginValidator()
    const { itemsCartAdded, setItemsCartAdded } = useContext(CartContext)
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
        //console.log(fullNameValidator(fullNameValue), telephoneValidator(phoneValue), mailValidator(mailValue))
        if (fullNameValidator(fullNameValue) && telephoneValidator(phoneValue) && mailValidator(mailValue)){
            const db = getFirestore()
            const queryCollection = collection(db, "orders")
            const queryFilter = query(queryCollection, orderBy("orderId", "desc"))
            console.log(queryFilter)
            
            getDocs(queryFilter).then(res=>{
                let lastOrderIdNumber
                if (res.docs.length > 0){
                    lastOrderIdNumber = res.docs[0].data().orderId
                    lastOrderIdNumber++
                }
                
                addDoc(queryCollection, {orderId: lastOrderIdNumber || 1, fullname: fullNameValue,  phoneNumber: phoneValue, isActive: true, email: mailValue, ...itemsCartAdded}).then(res=>{
                   setItemsCartAdded([])
                   history(`/orderCreated/${lastOrderIdNumber || 1}`)                   
                }).catch(error=>{
                    console.log(error)
                    MySwal.fire("We can't process your order at this time")
                })    
            }).catch(error=>console.log(error))
           
            
            


        }
        
    }

    const onClickHandlerHelpIcon = ()=> {
        MySwal.fire({
            html: <div>
                <h4>US phone number formats:</h4>
                <span>555-555-5555</span><br/>
                <span>1 555-555-5555</span><br/>
                <span>1 (555) 555-5555</span><br/>
                <span>15555555555</span><br/>
                <span>5555555555</span>

            </div>            
        })
    }

    return(
            <>
                <div className="loginContainer"> 
                    <div className="form-container"> 
                        <form action="/action_page.php" onSubmit={onSubmitHandler}> 
                        
                            <div className="inputContainer">
                                <span className="subtitle">NAME:</span>
                                <input type="text" name="fullName" onKeyUp={resetAlerts} />
                                <span className="inputAlerts">{fullNameAlert}</span>
                            </div>

                            <div className="inputContainer">
                                <span className="subtitle">PHONE:</span>  
                                <input type="text" name="phone" onKeyUp={resetAlerts} />
                                {phoneAlert && <TbHelp className="helpIcon" onClick={onClickHandlerHelpIcon}/>}
                                <span className="inputAlerts">{phoneAlert}</span>
                            </div>
                            
                            <div className="inputContainer">
                                <span className="subtitle">MAIL:</span>  
                                <input type="text" name="mail" onKeyUp={resetAlerts} />
                                <span className="inputAlerts">{mailAlert}</span>
                            </div>
                            
                            <button type="submit"  className="submit-btn">CREATE ORDER</button>
                        </form>
                    </div>  
                </div>  
                
                
            </>
    )
}