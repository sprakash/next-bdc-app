"use client"

export default function Mission() {

    return (
        <section className="flex-none lg:flex lg:flex-row">
            <div className="flex-1 md:text-left ml-5 pb-10">
                <h3 className="text-neutral-500 text-3xl mb-4 mt-8 uppercase tracking-wide"> Mission </h3>

                <p className="text-md text-gray-600 mb-6 w-5/6"> BDC communication and engagement is primarily social media. Current and updated information about grants, webinars, discounts, news and more are first posted and updated on social media, so please follow BDC on Facebook, Instagram, and Twitter. </p>

                <p className="text-md text-gray-600 mb-6 w-5/6"> BDC Filmmakers have “Editor” posting privileges on the BDC Facebook Page and can request posts to be shared on our other social media platforms. Post updates about your work and any resources you would like to share. With thousands of followers and counting, BDC&apos;s platforms are an easy and meaningful way to reach and engage the many fans who seek out and support your work. All posts subject to moderation. </p>

                <p className="text-md text-gray-600 mb-12 w-5/6"> Show your support for our all-volunteer organization by making a tax-deductible donation! Whether you give $5 or $500, your donation is the fuel that keeps us going! </p>

                <a id="donate" href="https://www.paypal.com/donate?token=6pZvHnW1-b6cykFLp6RjEPBPSZ_qUTzFdxnEVOoFM3joICtwHiKINB7XsHHHsdr-Q2t1xz4BTiLzngmud" className="py-3 px-10 text-black font-semibold bg-blue-200 hover:text-black" target="_blank"> DONATE HERE </a>
            </div>

            <div className="w-full max-w-md mx-auto md:mx-0 shadow-lg items-center align-center flex" aria-label=" Clair" role="img"><img src="/images/stclair.jpg" alt="st. clair" />
            </div>
        </section>
    );
}