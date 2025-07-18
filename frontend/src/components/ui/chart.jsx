import * as React from "react";

function ChartContainer({ className, children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export { ChartContainer };
