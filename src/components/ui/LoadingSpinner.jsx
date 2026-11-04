const LoadingSpinner = ({ label = "Loading..." }) => (
    <div className="flex min-h-56 items-center justify-center gap-3" role="status">
        <span className="loading loading-spinner loading-lg text-[#500071]" />
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
);

export default LoadingSpinner;
