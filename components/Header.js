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
                    <Image
                        className="flex"
                        src="/assets/DTube_files/images/DTube_Black.svg"
                        alt="dtube" 
                        width={100} 
                        height={50}
                    /> 
            </div>

            {/* center  */}
            <div className="flex">
              <SearchIcon className="hidden h-6 text-gray-600" />
              <input className="flex p-5 m-3 ml-60 h-10 w-96 bg-white outline-none placeholder-gray-500"
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
