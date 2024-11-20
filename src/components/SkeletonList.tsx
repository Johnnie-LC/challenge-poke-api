/* eslint-disable react/react-in-jsx-scope */
import SkeletonItem from "./SkeletonItem";

const SkeletonList: React.FC = () => {
  return (
    <div className="skeleton-list">
      {Array.from({ length: 20 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
};

export default SkeletonList;
