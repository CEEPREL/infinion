const UserCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-dark1 rounded-2xl p-6 w-96 h-72 animate-pulse flex flex-col items-center justify-center space-y-4">
      <div className="w-24 h-24 rounded-full bg-zinc-600 dark:bg-zinc-700" />
      <div className="w-32 h-4 bg-zinc-500 dark:bg-zinc-600 rounded" />
      <div className="w-48 h-3 bg-zinc-400 dark:bg-zinc-500 rounded" />
    </div>
  );
};

export default UserCardSkeleton;
