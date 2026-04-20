export default function LoadingAnimation() {
  return (
    <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-8 py-10">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Outer glowing pulse */}
        <div className="absolute inset-0 animate-ping rounded-full bg-violet-400/20 dark:bg-violet-500/10" style={{ animationDuration: '3s' }} />
        
        {/* Main spinning outer ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-[4px] border-neutral-100 border-t-violet-500 border-l-cyan-400 dark:border-neutral-800/50 dark:border-t-violet-400 dark:border-l-cyan-400 shadow-xl shadow-violet-500/10" style={{ animationDuration: '2s' }} />
        
        {/* Inner counter-spinning ring */}
        <div className="absolute inset-3 animate-spin rounded-full border-[4px] border-neutral-100/50 border-b-emerald-400 dark:border-neutral-800/80 dark:border-b-emerald-400" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        {/* Inner dot pulse */}
        <div className="relative h-6 w-6 animate-pulse rounded-full bg-linear-to-tr from-violet-600 to-cyan-500 shadow-md dark:from-violet-500 dark:to-cyan-400" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <p className="animate-pulse text-sm font-bold tracking-[0.2em] text-neutral-600 uppercase dark:text-neutral-300">
          Loading Data
        </p>
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 dark:bg-violet-500" style={{ animationDelay: '0ms' }} />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 dark:bg-cyan-500" style={{ animationDelay: '150ms' }} />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 dark:bg-emerald-500" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
