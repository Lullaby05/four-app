import { Skeleton } from '@/components/ui/skeleton';
export default async function Loading() {
  return (
    <div className="container flex items-center space-x-4 my-20">
      <div className="w-64 space-y-4">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-62.5" />
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-48 w-full rounded-md" />
      </div>
      <div className="w-80 space-y-4">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-62.5" />
      </div>
    </div>
  );
}
