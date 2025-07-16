import { HiOutlineBan } from "react-icons/hi";

const Icon = HiOutlineBan as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const FeatureUnavailable = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full w-full animate-fade-in px-4 py-10">
      <Icon className="text-red-500 text-6xl mb-4 animate-pulse" />
      <h1 className="text-2xl font-bold mb-2">Feature Not Available</h1>
      <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
        This feature is currently unavailable or still under development. Please
        check back later.
      </p>
    </div>
  );
};

export default FeatureUnavailable;
