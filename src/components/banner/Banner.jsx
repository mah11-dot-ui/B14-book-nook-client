"use client"
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import BannerSkeleton from './BannerSkeleton';

const Banner = () => {
    const [banner, setBanner] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('/bannerData.json')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to load banner data (${res.status})`)
                }
                return res.json()
            })
            .then(data => setBanner(data))
            .catch(error => {
                console.error('Unable to load banner data:', error)
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <BannerSkeleton />
    }

    if (error) {
        return <p role="alert" className="py-12 text-center">Banner content could not be loaded.</p>
    }

    return (
        <div>
            <Swiper
                pagination={true}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={banner.length > 1}
                className="mySwiper"
            >
                {
                    banner.map(banner =>
                        <SwiperSlide key={banner.id}>
                            <figure className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[480px]">
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    width={1600}
                                    height={900}
                                    sizes="100vw"
                                    className="h-full w-full object-cover"
                                />
                                <span aria-hidden="true" className="absolute inset-0 bg-black/60" />
                                <div className="absolute inset-0 z-10 flex items-center">
                                    <div className="mx-auto w-full max-w-6xl px-6 text-white sm:px-10">
                                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
                                            {banner.badge}
                                        </p>
                                        <h2 className="max-w-2xl text-3xl font-bold sm:text-5xl">
                                            {banner.title}
                                        </h2>
                                        <p className="mt-4 max-w-xl text-base text-white/90 sm:text-lg">
                                            {banner.subtitle}
                                        </p>
                                        <p className="mt-2 max-w-xl text-sm text-white/75 sm:text-base mb-4">
                                            {banner.description}
                                        </p>
                                        <Link href={"/all-books"}>
                                            <Button className={"bg-[#EEE3B0] text-black hover:bg-[#EEE3B0]/70"}>
                                                {banner.buttonText}
                                                <ArrowUpRight />

                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </figure>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default Banner;