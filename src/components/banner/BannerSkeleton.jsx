const BannerSkeleton = () => (
    <div
        aria-label="Loading banner"
        aria-busy="true"
        className="h-[280px] w-full animate-pulse bg-muted sm:h-[360px] md:h-[480px]"
    >
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-4 px-6 sm:px-10">
            <div className="h-4 w-32 rounded bg-muted-foreground/20" />
            <div className="h-10 w-3/4 max-w-xl rounded bg-muted-foreground/20 sm:h-14" />
            <div className="h-5 w-2/3 max-w-lg rounded bg-muted-foreground/20" />
            <div className="h-4 w-1/2 max-w-md rounded bg-muted-foreground/20" />
            <div className="mt-2 h-10 w-32 rounded bg-muted-foreground/20" />
        </div>
    </div>
);

export default BannerSkeleton;
