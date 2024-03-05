import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function EditProduct(props) {
    console.log(props)
    const [name, setName] = useState(props.myProduct.name);
    const [qty, setQty] = useState(props.myProduct.qty);
    const [category, setCategory] = useState(props.myProduct.category);

    const handleSubmit = () => {
        const data = {
            id:props.myProduct.id, name, qty, category
        }
        console.log(category)
        Inertia.post('/product/update', data)
        setName('')
        setQty('')
        setCategory('')
    }

    console.log(props)
    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            
            <div className="p-6 text-gray-900">
                <h1>Edit Barang</h1>
                <input
                    type="text"
                    placeholder="Nama"
                    className="input input-bordered w-full m-2  "
                    onChange={(name) => setName(name.target.value)}
                    value={name} />
                <input
                    type="text"
                    placeholder="Jumlah Barang"
                    className="input input-bordered w-full m-2"
                    onChange={(qty) => setQty(qty.target.value)}
                    value={qty} />
                <select
                    className="select select-bordered w-full m-2"
                    onChange={(category) => setCategory(category.target.value)}
                    value={category}
                >
                    <option defaultChecked>Kategori</option>
                    {props.category.map((category, i) => (
                        <option value={category.id} key={i}>{category.category}</option>
                    ))}
                </select>
                <button
                    className='btn btn-primary m-2'
                    onClick={() => handleSubmit()
                    }>
                    Simpan
                </button>
            </div>
        </div>
    )
}