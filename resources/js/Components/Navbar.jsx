import { Link } from "@inertiajs/react"

const NavBar = ({ user }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/">
          <div className="btn btn-ghost normal-case text-xl">Si Paling Supplier</div>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control flex">
          <form action="/product/search" method="GET">
            <input className="input input-sm input-bordered" type="text" name="search" placeholder="Cari Produk" />
            <input  className='btn btn-sm' type="submit" value="CARI" />
          </form>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost">
            <div className="">
              {!user? "Guest" : user.name }
            </div>
          </label>
          <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            {!user ?
              <>
                <li><Link href={route('login')} as="button">Login</Link></li>
                <li><Link href={route('register')} as="button">Register</Link></li>
              </>
              :
              <>
                <li>
                  <Link href={route('dashboard')} as="button" className="justify-between">
                    Dashboard
                  </Link>
                </li>
                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar