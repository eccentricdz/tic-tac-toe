import React, { PropsWithChildren, useEffect } from "react";
import "./Carousel.css";
import { Button } from "../Button";

type CarouselProps = {
  windowSize: {
    width: number;
    height?: number;
  };

  itemCount: number;
  activeIndex?: number;
  getHeader?: (index: number) => React.ReactNode;
  freeScroll?: boolean;
};

export const Carousel: React.FC<PropsWithChildren<CarouselProps>> = ({
  windowSize: { width, height },
  itemCount,
  activeIndex = 0,
  freeScroll = false,
  children,
  getHeader,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(activeIndex);

  // Everytime the itemCount changes, we want to set the current index to the last item.
  useEffect(() => {
    setCurrentIndex(itemCount - 1);
  }, [itemCount]);

  return itemCount ? (
    <div className="carousel">
      {/* Only show the header if freeScroll is not active, since we do not keep track of the current position of the strip,
      and we do not have a way to determine the current index. 
      */}
      {freeScroll ? null : (
        <div className="header">
          {getHeader ? getHeader(currentIndex) : null}
          <div className="nav">
            <Button
              variant="secondary"
              disabled={!currentIndex}
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              icon="arrow_back"
            />
            <Button
              variant="secondary"
              disabled={currentIndex === itemCount - 1}
              onClick={() =>
                setCurrentIndex(Math.min(itemCount - 1, currentIndex + 1))
              }
              icon="arrow_forward"
            />
          </div>
        </div>
      )}
      <div
        className="window"
        style={{ width, height, overflowX: freeScroll ? "auto" : "hidden" }}
      >
        <div
          className="strip"
          style={{
            minWidth: itemCount * width,
            transform: freeScroll
              ? "none"
              : `translateX(${currentIndex * width * -1}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  ) : null;
};
