import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl my-4 text-blue-600 font-bold">App Plus</h1>

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
                src={currentUser.profielPicture}
                className="h-7 w-7 rounded-full object-cover"
                alt="img"
              />
            ) : (
              <li>SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
