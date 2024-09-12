import logo from "../assets/mhlogo3.png"
import { FaLinkedin } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa6"

function Navbar(){
    return(
        <nav className="mb-20 flex items-center justify-between py-6">
            
            <div class="relative group cursor-pointer">
            <div
                class="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
            </div>
            <div
                class="relative px-7 py-6 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div class="space-y-2">
                <div className="flex flex-shrink-0 items-center">
                <img src={logo} alt="logo"></img>
                </div>
                </div>
            </div>
            </div>
            <div className="flex m-8 items-center justify-center gap-4 text-3xl">
                <a href="https://github.com/Hosser5150">
                <FaGithub></FaGithub>
                </a>
                <a href="https://www.linkedin.com/in/matthew-hoskins51/">
                <FaLinkedin></FaLinkedin>
                </a>
                
            </div>
        </nav>
    );
}

export default Navbar

