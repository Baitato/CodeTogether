import { Avatar } from "@nextui-org/react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncLogin, asyncLogout } from "../store/authSlice";
import { RootState } from "../store/store";
import { socket } from "../socket"
import { useSearchParams } from "react-router-dom";

export default function Navbar() {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();

  const handleLogin = async () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  const handleLogout = () => {
    console.log(user)
    dispatch(asyncLogout() as any)
  }
  return (
    <div className="w-screen relative py-2 z-50">
      <div className="flex items-center font-mono h-full px-12 justify-between z-50">
        <h1 className="text-3xl font-black text-slate-200 z-50 mb-0">
          <Link to={"/"} className="text-inherit">
            CodeTogether
          </Link>
        </h1>
        <div className="flex items-center z-50">
          {(<Link
            to={"/create"}
            className="mr-8 p-1 px-3 border border-slate-300 rounded-sm text-white hover:bg-white hover:text-black"
          > Add Problem
          </Link>)}

          { !searchParams.get('id') && <button className="mr-8 p-1 px-3 border border-slate-300 rounded-sm text-white hover:bg-white hover:text-black" onClick={() => {
            socket.emit("createroom")
          }}>
              Create Room
          </button> }
          
          {user && (
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <img src={user.image} alt="" className="w-8 h-8 rounded-full object-cover object-center" />
              <p className="m-0 text-white text-sm hover:underline" onClick={handleLogout}>Logout</p>
            </div>
          )}
          {!user && (
            <button className="p-1 px-3 bg-white rounded" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
      <div className="absolute w-full h-full bg-[#141412] top-0 -z-1"></div>
    </div>
  );
}
