import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Paginator from '@/Components/Homepage/Paginator';
import ProductList from '@/Components/Homepage/ProductList';

export default function Homepage(props) {
    console.log(props);
    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className='gap-4 p-4  flex justify-center'>
                <form action="/product/category" className='flex' method="GET">
                    {props.category && props.category.map((category, i) => (
                        <Link key={i} href="/">
                            <div className="btn btn-ghost normal-case text-s " value={category.id} key={i}>{category.category}</div>
                        </Link>
                    ))}
                </form>
            </div>
            <div className='flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4   '>
                <ProductList product={props.product.data} />
            </div>
            { }
            <div className='flex justify-center items-center'>
                <Paginator meta={props.product} />
            </div>
        </div>
    )
}