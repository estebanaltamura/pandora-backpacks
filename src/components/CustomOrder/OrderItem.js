import "./OrderItem.css"

export const OrderItem = ({product})=> {
    return (
        <>
            <div className="customOrderItem">
                <img className="customOrderImage" src={product.images[0]} />
                <span className="customOrderName">{product.name}</span>
                <span className="customOrderQuantity">{product.quantity}</span>
                <span className="customOrderPrice">{product.price}</span>
                <span className="customOrderSubTotal">{product.subTotal}</span>
            </div>

        </>
    )
}