import { FC, ReactNode, useRef } from 'react';
import './Tooltip.scss';

type Props = {
  children: ReactNode;
  tooltip?: string;
};

export const ToolTip: FC<Props> = ({ children, tooltip }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX } = event;

    if (!tooltipRef.current || !container.current) {
      return;
    }

    const { left } = container.current.getBoundingClientRect();

    tooltipRef.current.style.left = `${clientX - left}px`;
  };

  return (
    <div
      ref={container}
      onMouseEnter={handleMouseEnter}
      className="tooltip"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="tooltip__message"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
