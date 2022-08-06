import React, { useMemo } from "react";

interface LoadingSpinnerProps {
  minHeight?: number;
  size: "sm" | "rg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  minHeight,
  size,
}) => {
  const dims = useMemo(
    () => ({
      sm: {
        border: 5,
        width: 25,
      },
      rg: {
        border: 6,
        width: 50,
      },
    }),
    [],
  );

  return (
    <div
      className={`flex items-center justify-center w-full`}
      style={{ minHeight: `${minHeight ?? 250}px` }}
    >
      <div
        className="lds-ring"
        style={{
          width: dims[size].width + "px",
          height: dims[size].width + "px",
        }}
      >
        {Array(4)
          .fill(0)
          .map(() => (
            <div
              key={Math.random()}
              style={{
                width: dims[size].width + "px",
                height: dims[size].width + "px",
                borderWidth: dims[size].border + "px",
                margin: dims[size].border + "px",
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
