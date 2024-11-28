import Pagination from "_components/Pagination";
import SkeletonItem from "_components/SkeletonItem";

const SkeletonList: React.FC = () => {
  return (
    <>
      <div className="skeleton-list">
        {Array.from({ length: 20 }).map((_, index) => (
          <SkeletonItem key={index} />
        ))}
      </div>
      <Pagination isSkeleton />
    </>
  );
};

export default SkeletonList;
