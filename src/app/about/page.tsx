export default function AboutPage() {
    return (
    <main className="min-h-[200px] mt-24">
        <div className="md:flex-none lg:flex items-center pt-4 px-8 bg-linear-to-r from-gray-800 to-black min-h-[250px] pb-20 lg:items-start">
            <div className="flex-1  border-b border-gray-600  md:w-full lg:w-4/5">
                <h1 className="text-5xl font-bold text-gray-200 mb-4 mt-20">
                About Us
                </h1>
             
                <p className="text-gray-300  pb-8 text-2xl pt-3 md:w-full lg:w-4/5">
The Black Documentary Collective (BDC) was founded by the late, great documentarian St. Clair Bourne to support the artistic development and professional advancement of documentary media makers of African descent.</p>
                <p className="text-gray-300  pb-8 text-2xl pt-3 md:w-full lg:w-4/5"> The BDC supports its members through promotional efforts, fundraising and crowdfunding support, access to free and discounted educational, artistic, and professional development workshops, professional services, and networking events with our many partners, as well as screenings and referrals for jobs, distribution, and other opportunities. 
</p>
<p className="text-gray-300  pb-8 text-2xl pt-3 md:w-full lg:w-4/5">The BDC is also dedicated to making a difference in the ever-increasing communities that are reflected in and resonate with the varied work of our filmmakers, through community partnerships, impact and engagement.  We have helped countless members raise funds, promote and screen their films, connect with organizational and local partners, and secure distribution, work-for-hire, consulting, teaching, and more.  Please visit the online BDC catalog and directory to connect with our talented members. 
</p>
   <div>
                                <iframe title="vimeo-player" src="https://player.vimeo.com/video/898971644?h=7c79b800e7" width="640" height="360" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>

                </div>
            </div>
            <div className="md:pt-20">
                             <p className="text-gray-300 max-w-2xl pb-8 text-2xl">
                                <a className="border-2 border-gray-500 block py-3 px-5 hover:bg-gray-500" href="https://www.nytimes.com/video/nyregion/1194817113938/lens-st-clair-bourne.html" target="_blank"><h2 className="text-2xl">Watch the New York Times Interview with
St. Clair Bourne</h2></a>
                             </p>

               <a href="https://www.nytimes.com/video/nyregion/1194817113938/lens-st-clair-bourne.html" target="_blank"> 
               <img src="/images/still-nytimes-clip.png" 
                alt="Hero Image" 
                className="h-[400px] w-auto object-contain"
                />
                </a>
            </div>
       
            {/* <div className="shrink-0 ml-8 sm:mt-15 md:mt-0">
                <img src="/images/stclairbourne_640x391_bdc.jpg" 
                alt="Hero Image" 
                className="h-[400px] w-auto object-contain"
                />
            </div> */}
        </div>
    
       
    </main>)
}