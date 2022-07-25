import Image from "next/image";
import HeaderIcon from "./HeaderIcon";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

function Header() {
  // const [session] = useSession();

  return (
    <header className="sticky top-0 z-50 bg-green-600 flex items-center p-2 lg:px-5 shadow-md">
      <div className="flex m-1 justify-between">
            {/* Left */}
            <div className="flex">
                <a href="#" className="">
                    <img
                        className="flex bg-slate-300 rounded-xl shadow-lg p-2 "
                        src="assets/DTube_files/images/DTube_Black.svg"
                        alt="logo" 
                        width={200} 
                        height={100}
                    />
                </a>
                <a href="#" className="flex p-4">
                  <h1 className="">
                    <b>
                      0.102$
                    </b>
                  </h1>
                </a>
            </div>

            {/* center  */}
            <div className="">
              <SearchIcon className="hidden h-6 text-gray-600" />
              <input className="flex p-5 m-3 h-10 bg-white outline-none placeholder-gray-500"
            placeholder="Search Dtube"/>
            </div>

            {/* right */}
            <div>

            </div>
      </div>
    </header>
  );
}

export default Header;
