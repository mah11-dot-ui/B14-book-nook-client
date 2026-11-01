import Banner from '@/components/banner/Banner';
import BannerSkeleton from '@/components/banner/BannerSkeleton';
import OurBooks from '@/components/Our Books/OurBooks';
import OurBooksSkeleton from '@/components/Our Books/OurBooksSkeleton';
import React, { Suspense } from 'react';


const page = () => {
  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
    </div>
  );
};

export default page;