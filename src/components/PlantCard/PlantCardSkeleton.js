import React from "react";
import Skeleton from '@mui/material/Skeleton';

export default function PlantCardSkeleton() {
  return (
    <div style={{ margin: '10px' }}>
      <Skeleton variant="rectangular" width={321} height={152} />
    </div>
  );
}