const isProducts = (product) => {

    console.log(product);
    return product.map((data, i) => {
        return (
        <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl">
            <div className="bg-slate-400 h-52"></div>
            <div className="card-body">
                <h2 className="card-title text-white">
                    {data.name}
                </h2>
                <p>Jumlah Barang :{data.qty}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-inline">{data.category}</div>
                </div>
            </div>
        </div>
        )
    })
}
const noProduct = () => {
    return(
        <div>Belum ada berita tersedia</div>
    )
}
const ProductList = ({ product }) => {
    return !product ? noProduct(): isProducts(product)
}

export default ProductList