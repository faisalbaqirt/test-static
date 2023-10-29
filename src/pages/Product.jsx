import ProductList from "../components/ProductList"
import CreateProduct from "../components/CreateProduct"
import "./product.css"

const Product = () => {
    return (
        <div>
            <ProductList />
            <CreateProduct />
        </div>
    )
}

export default Product;