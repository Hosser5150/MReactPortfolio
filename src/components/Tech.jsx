import { FaHtml5 } from "react-icons/fa6"
import { FaJs } from "react-icons/fa"
import { FaReact } from "react-icons/fa6"
import { FaCss3 } from "react-icons/fa"
import { RiTailwindCssFill } from "react-icons/ri"

function Tech(){
    return(
        <div>
        <div className="flex-center text-center text-4xl font-thin tracking-tight pb-20">
            <h1 className="uppercase">Technologies I Learned to Create This Site</h1>
            </div>
        <div className="flex flex-center text-6xl gap-8 justify-center items-center pb-20 ">
            <div className="rounded-2xl border-4 border-neutral-800 p-4">
            <FaHtml5></FaHtml5>
            </div>
            <div className="rounded-2xl border-4 border-neutral-800 p-4">
            <FaJs></FaJs>
            </div>
            <div className="rounded-2xl border-4 border-neutral-800 p-4">
            <FaReact></FaReact>
            </div>
            <div className="rounded-2xl border-4 border-neutral-800 p-4">
            <FaCss3></FaCss3>
            </div>
            <div className="rounded-2xl border-4 border-neutral-800 p-4">
            <RiTailwindCssFill></RiTailwindCssFill>
            </div>
        </div>
        <div className="border-neutral-900 pb-4 lg:mb-20 border-b-4"></div>
        </div>
    )
}

export default Tech 