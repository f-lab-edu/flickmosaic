import React, { createContext, useContext } from 'react';

import Button from './Button';
import useCarousel from '../hooks/useCarousel';
import { CarouselContextType, RootProps, TrackProps, ArticleProps } from '../types/Carousel';
import '../styles/Carousel.css';

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

const useCarouselContext = (): CarouselContextType => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be used within Carousel.Root');
  }
  return context;
};

const Root: React.FC<RootProps> = ({ height, articleWidth, slides = [], children }): React.JSX.Element => {
  const carouselHooks = useCarousel({ articleWidth, slides: slides });

  if (!slides || slides.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <CarouselContext.Provider value={carouselHooks}>
      <div
        ref={carouselHooks.containerRef}
        className="group relative w-full max-w-full overflow-hidden min-h-[200px] box-border"
        style={{ height: `${height}px` }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const LeftButton: React.FC = (): React.JSX.Element => {
  const { handlePrev } = useCarouselContext();

  return (
    <Button
      onClick={handlePrev}
      className="absolute top-0 w-10 h-full border-none cursor-pointer flex items-center text-[28px] font-bold text-white z-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[ease] hover:!opacity-100 left-0 justify-start pl-5 bg-[linear-gradient(to_right,black,rgba(0,0,0,0.6),rgba(0,0,0,0.1),transparent)]"
      aria-label="이전 슬라이드"
    >
      &#8249;
    </Button>
  );
};

const RightButton: React.FC = (): React.JSX.Element => {
  const { handleNext } = useCarouselContext();

  return (
    <Button
      onClick={handleNext}
      className="absolute top-0 w-10 h-full border-none cursor-pointer flex items-center text-[28px] font-bold text-white z-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[ease] hover:!opacity-100 right-0 justify-end pr-5 bg-[linear-gradient(to_left,black,rgba(0,0,0,0.6),rgba(0,0,0,0.1),transparent)]"
      aria-label="다음 슬라이드"
    >
      &#8250;
    </Button>
  );
};

const Track: React.FC<TrackProps> = ({ children, articleWidth }): React.JSX.Element => {
  const { trackRef, transitionEnabled, displayIndex, clonedSlides } = useCarouselContext();

  return (
    <div
      ref={trackRef}
      className={`flex h-full${!transitionEnabled ? '' : ' transition-transform duration-500 ease-[ease]'}`}
      style={{
        transform: `translateX(-${displayIndex * articleWidth}px)`,
        width: `${clonedSlides.length * articleWidth}px`,
      }}
    >
      {children}
    </div>
  );
};

const Article: React.FC<ArticleProps> = ({ articleWidth, layout = 'overlay', children }): React.JSX.Element => {
  const { clonedSlides, handleTransitionEnd } = useCarouselContext();

  return (
    <>
      {clonedSlides.map((slide, index) => (
        <article
          key={`${slide.id}-${index}`}
          className={`flex-none h-full max-h-full p-2 box-border cursor-pointer min-h-50 flex flex-col overflow-hidden [&_a]:h-full [&_a]:max-h-full [&_a]:w-full [&_a]:max-w-full [&_a]:block [&_a]:overflow-hidden slider-article-${layout}`}
          style={{ width: `${articleWidth}px` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {children(slide, index)}
        </article>
      ))}
    </>
  );
};

// 컴파운드 컴포넌트 구조
const Carousel = {
  Root,
  LeftButton,
  RightButton,
  Track,
  Article,
};

export default Carousel;
