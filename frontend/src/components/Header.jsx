import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-[4rem] px-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-600">petPortal</h1>
      </div>
      <nav className="flex items-center justify-between gap-[3rem] text-[1.1rem]">
        <Link>Home</Link>
        <Link>Adopt</Link>
        <Link>About Us</Link>
        <Link>Contact Us</Link>
      </nav>
      <div className="flex items-center justify-between gap-[2rem]">
        <Link to="/signup">
          <button className="bg-green-400 px-6 py-2 font-semibold rounded-md cursor-pointer">
            Signup
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-yellow-400 px-6 py-2 font-semibold rounded-md cursor-pointer">
            Login
          </button>
        </Link>
        <Link to="/addPet">
          <button className="bg-pink-400 px-6 py-2 font-semibold rounded-md cursor-pointer">
            Add pet!
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
