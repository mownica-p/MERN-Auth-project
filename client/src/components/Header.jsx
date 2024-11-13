import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={
                  currentUser?.profilePicture ||
                  "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.2082689087.1731448230&semt=ais_hybrid"
                }
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Signin</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
