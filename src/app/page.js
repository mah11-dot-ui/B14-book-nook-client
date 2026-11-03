import Banner from '@/components/banner/Banner';
import BannerSkeleton from '@/components/banner/BannerSkeleton';
import NewArrivals from '@/components/books/NewArrivals';
import HomeHighlights from '@/components/books/HomeHighlights';
import { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>
      <NewArrivals />
      <HomeHighlights />
    </div>
  );
};
 
export default page;