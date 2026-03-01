import Link from 'next/link';

import { MovieCardProps } from '@/types/Carousel';
const layoutClasses: Record<string, Record<string, string>> = {
  // .slider-card-{layout}
  card: {
    none: 'block h-full',
    overlay: 'block h-full',
    top: 'flex flex-col bg-black h-full',
    left: 'flex flex-row bg-black relative h-full',
  },
  // .slider-card-{layout} .slider-image-container
  imageContainer: {
    none: 'w-full h-full',
    overlay: 'w-full h-full',
    top: 'w-full h-[70%] rounded-b-2 overflow-hidden relative order-2',
    left: 'w-[86%] h-full rounded-2 overflow-hidden order-2 relative z-2',
  },
  // .slider-card-{layout} .slider-image
  image: {
    none: 'absolute top-0 left-0 w-full h-full z-1',
    overlay: 'absolute top-0 left-0 w-full h-full z-1',
    top: 'w-full h-full',
    left: 'w-full h-full rounded-2',
  },
  // .slider-content-{layout}
  content: {
    none: 'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-2 text-white',
    overlay:
      'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-2 text-white',
    top: 'flex-1 p-3 bg-black text-white flex flex-col justify-center rounded-t-2 order-1',
    left: 'flex-1 flex p-4 bg-black text-white flex flex-col justify-center rounded-l-2 relative order-1',
  },
  // .slider-content-{layout} .slider-title
  title: {
    none: 'text-base text-white mb-0 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]',
    overlay: 'text-base text-white mb-1.5 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]',
    top: 'text-sm text-white mb-1 font-bold',
    left: 'text-base text-white mb-2 font-bold leading-[1.2] z-3 relative',
  },
  // .slider-content-{layout} .slider-description
  description: {
    none: '',
    overlay: 'text-[13px] text-white',
    top: 'text-[11px] text-[#ccc] opacity-80',
    left: '',
  },
};

const MovieCard = (props: MovieCardProps) => {
  return (
    <Link href={`/movie/${props.slide.id}`}>
      <div
        className={`relative w-full max-w-full h-full max-h-full rounded-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden isolate ${layoutClasses.card[props.layout]}`}
      >
        <div className={`relative overflow-hidden min-h-[100px] ${layoutClasses.imageContainer[props.layout]}`}>
          <img
            src={props.slide.image}
            alt={props.slide.title}
            className={`w-full h-full object-cover block ${layoutClasses.image[props.layout]}`}
            loading={props.priority ? 'eager' : 'lazy'}
          />
        </div>
        <div className={`${layoutClasses.content[props.layout]}`}>
          {props.layout !== 'left' && (
            <h3
              className={`font-bold overflow-hidden whitespace-nowrap text-ellipsis ${layoutClasses.title[props.layout]}`}
            >
              {props.slide.title}
            </h3>
          )}
          {props.slide.description && props.layout !== 'none' && props.layout !== 'left' && (
            <p className={`overflow-hidden leading-[1.4] line-clamp-2 ${layoutClasses.description[props.layout]}`}>
              {props.slide.description}
            </p>
          )}
          {props.layout === 'left' && (
            <span
              className="absolute bottom-0 right-[-5px] text-[48px] text-white leading-none z-1"
              data-rank={props.slide.rank}
            >
              {props.slide.rank}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
