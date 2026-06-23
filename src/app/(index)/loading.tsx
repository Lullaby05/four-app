import { Skeleton } from '@/components/ui/skeleton';
export default async function Loading() {
  return (
    <div className="container flex items-center space-x-4 my-20">
      {/* 左侧栏固定 */}
      <div className="w-64 space-y-4">
        <Skeleton className="h-4 w-37.5" />
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-4 w-50" />
      </div>
      {/* 右侧内容区域 */}
      <div className="flex-1 space-y-4">
        <Skeleton className="h-4 w-37.5" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-48 round" />
          <Skeleton className="h-48 round" />
          <Skeleton className="h-48 round" />
          <Skeleton className="h-48 round" />
          <Skeleton className="h-48 round" />
          <Skeleton className="h-48 round" />
        </div>
      </div>
    </div>
  );
}
