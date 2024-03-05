import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {

    const [name, setName] = useState('');
    const [qty, setQty] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            name, qty, category
        }
        console.log(category)
        Inertia.post('/product', data)
        setIsNotif(true)
        setName('')
        setQty('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.myProduct && !props.category) Inertia.get('/product')
        return;
    }, [])

    console.log(props)
    return (
        <AuthenticatedLayout

            user={props.auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Produk</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 p-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <div>{isNotif && props.flash.massage}</div>
                        <input
                            type="text"
                            placeholder="Nama"
                            className="input input-bordered w-full m-2 text-white"
                            onChange={(name) => setName(name.target.value)}
                            value={name} />
                        <input
                            type="text"
                            placeholder="Jumlah Barang"
                            className="input input-bordered w-full m-2 text-white"
                            onChange={(qty) => setQty(qty.target.value)}
                            value={qty} />
                        <select
                            className="select select-bordered w-full m-2 text-white"
                            onChange={(category) => setCategory(category.target.value)}
                            value={category}
                        >
                            <option disabled hidden className="text-opacity-0" value={""}>Kategori</option>
                            {props.myProduct && props.myProduct.length > 0 ? props.category.map((category, i) => (
                                <option value={category.id} key={i}>{category.category}</option>
                            )) : <></>}
                        </select>
                        <button
                            className='btn btn-primary m-2'
                            onClick={() => handleSubmit()
                            }>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <h1>
                    Daftar Barang
                </h1>
            </div>
                {props.myProduct && props.myProduct.length > 0 ? props.myProduct.map((product, i) => {
                    return (
                        <div key={i} className="p-4">
                            <div className="card w-full  bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-white">
                                        {product.name}
                                        {/* <div className="badge badge-secondary">NEW</div> */}
                                    </h2>
                                    <p>{product.qty}</p>
                                    <div className="card-actions justify-between">
                                        <div className="badge badge-inline">
                                            {product.category.category}
                                        </div>
                                        <div>
                                            <div className="badge badge-outline">
                                                <Link href={route('edit.product')} method='get' data={{ id: product.id }} as='button'>
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link href={route('delete.product')} method='get' data={{ id: product.id }} as='button'>
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : <p>Belum ada Product</p>}
        </AuthenticatedLayout>
    );
}
