import "./css/SkeletonItem.css";

const SkeletonItem: React.FC = () => {
  return (
    <div className="skeleton-item">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text"></div>
    </div>
  );
};

export default SkeletonItem;
