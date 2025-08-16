import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

const About = () => {

    useGSAP(() => {
        const titleSplit = SplitText.create('#about h2', {
            type: 'words'
        })

        const scrollTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top center'
            }
        })

        scrollTimeline.from(titleSplit.words, {
            opacity: 0,
            duration: 1,
            yPercent: 100,
            ease: 'expo.out',
            stagger: 0.02
        }).from('.top-grid div, .bottom-grid div', {
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut',
            stagger: 0.04
        }, '-=0.5')
    }, [])

    return (
        <div id='about'>
            <div className='mb-16 md:px-0 px-5'>
                <div className="content">
                    <div className='md:col-span-8'>
                        <p className="badge">Best Cocktails</p>
                        <h2>Where every detail matters <span className='text-white'>-</span>from muddle to garnish</h2>
                    </div>

                    <div className='sub-content relative'>
                        <p>
                            Every cocktail we serve is a reflection of our
                            obsession with detail - from the first muddle to the
                            final garnish. That care is what turns a simple drink
                            into something truly memorable.
                        </p>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                            {/* Star Rating */}
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Rating and Customer Count */}
                            <div className="lg:text-center">
                                <p className='md:text-3xl text-xl font-bold mb-1'>
                                    <span>4.5</span>/5
                                </p>
                                <p className='text-sm text-white-100'>More than 12000+ customers</p>
                            </div>

                            {/* Customer Profile Pictures */}
                            <div className="flex items-center -space-x-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-white">
                                    <img src="/images/profile1.png" alt="Customer 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-white">
                                    <img src="/images/profile2.png" alt="Customer 2" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full overflow-hidden border-1 border-white">
                                    <img src="/images/profile3.png" alt="Customer 3" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-bold text-xs">+12k</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='top-grid'>
                <div className='md:col-span-3'>
                    <div className='noisy' />
                    <img src="/images/abt1.png" alt="grid-img-1" />
                </div>

                <div className='md:col-span-6'>
                    <div className='noisy' />
                    <img src="/images/abt2.png" alt="grid-img-2" />
                </div>

                <div className='md:col-span-3'>
                    <div className='noisy' />
                    <img src="/images/abt5.png" alt="grid-img-5" />
                </div>

            </div>
            <div className="bottom-grid">
                <div className='md:col-span-8'>
                    <div className='noisy' />
                    <img src="/images/abt3.png" alt="grid-img-3" />

                </div>
                <div className='md:col-span-4'>
                    <div className='noisy' />
                    <img src="/images/abt4.png" alt="grid-img-4" />

                </div>
            </div>
        </div>
    )
}

export default About