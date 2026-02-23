import React from 'react';

type ErrorProps = {
  message?: string;
  retry?: () => void;
};

const Loading: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center gap-3 min-h-60 p-6 box-border text-[#84868d]"
      role="status"
      aria-live="polite"
    >
      <div className="w-6 h-6 border-[3px] border-white/15 border-t-[#f82f62] rounded-full animate-status-spin" />
      <div className="text-4 leading-5.5">로딩중...</div>
    </div>
  );
};

const ErrorState: React.FC<ErrorProps> = ({ message, retry }) => {
  return (
    <div
      className="flex items-center justify-center gap-3 min-h-60 p-6 box-border flex-col text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-white text-4.5 font-bold  leading-6 mb-1.5">문제가 발생했어요</div>
      {message && <div className="text-[#84868d] text-[14px] leading-5 mb-3">{message}</div>}
      {retry && (
        <button
          className="text-white bg-[#f82f62] border-0 rounded-[6px] px-4 py-2.5 text-[14px] cursor-pointer transition-colors duration-200 ease-[ease] hover:bg-[#d91e4f]"
          onClick={retry}
          type="button"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

const NotFoundState: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center gap-3 min-h-60 p-6 box-border flex-col text-center" role="alert">
      <div className="text-white text-4.5 font-bold leading-6 mb-1.5">404</div>
      <div className="text-[#84868d] text-[14px] leading-5 mb-3">{message || '영화를 찾을 수 없습니다'}</div>
      <button
        className="text-white bg-[#f82f62] border-0 rounded-[6px] px-4 py-2.5 text-[14px] cursor-pointer transition-colors duration-200 ease-[ease] hover:bg-[#d91e4f]"
        onClick={() => window.history.back()}
        type="button"
      >
        이전 페이지로
      </button>
    </div>
  );
};

const Status = {
  Loading,
  ErrorState,
  NotFoundState,
} as const;

export default Status;
export { Loading, ErrorState };
