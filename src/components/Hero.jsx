import profile from "../assets/mhoskins.png"

function Hero(){
    return(
        <div className="border-neutral-900 pb-4 lg:mb-20 border-b-4">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">Matthew Hoskins</h1>
                        <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">Passionate University Student and Amateur Coder</span>
                        <p className="my-2 max-w-xl py-6 font-light tracking-tighter">I am a 3rd year computer science student currently doing my Bachelor's in CS at the University of Guelph. This site
                            serves as a showcase of what I can do and a nice place for my Coop work term reports, please see the navigation tools
                            above to access my workterm report.
                        </p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:p-8 flex justify-center">
                <img src={profile} alt="profile" className="rounded-lg"></img>
                </div>
            </div>
        </div>
    );

}

export default Hero