import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import AlarmIcon from '@/assets/alarm.svg';
import FlickMosaicIcon from '@/assets/flickmosaic.svg';
import SearchIcon from '@/assets/search.svg';
import Button from '@/components/Button';
import useSearchMovie from '@/hooks/useSearchMovie';

const Header: React.FC = () => {
  const { pathname } = useRouter();
  const { query, setQuery, handleEnterKeyDown } = useSearchMovie();

  return (
    <header className="fixed top-0 left-0 right-0 z-100 w-full">
      <nav className="relative flex items-center justify-between w-full h-18 px-10 py-3 bg-black box-border overflow-hidden">
        <div className="flex items-center flex-1 min-w-0">
          <Link href="/" className="mr-10 shrink-0 [&>svg]:w-22 [&>svg]:h-6.5">
            <FlickMosaicIcon />
          </Link>

          <div className="flex flex-1 min-w-0">
            <ul className="flex items-center">
              <li className="header-nav-item">
                <a
                  data-active={pathname === '/'}
                  className="group text-[#84868d] transition whitespace-nowrap hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white data-[active=true]:hover:text-[#84868d] tracking-[0] m-0 p-0 text-4 leading-5.5"
                  href="#"
                >
                  <span className="relative p-4 block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-[#84868d] after:rounded-[1px] after:transition after:-translate-x-1/2 group-hover:after:w-4/5 group-data-[active=true]:after:h-[2px] group-data-[active=true]:after:bg-white group-data-[active=true]:after:w-4/5">
                    구독
                  </span>
                </a>
              </li>
              <li className="header-nav-item">
                <a
                  data-active={pathname === '/purchase'}
                  className="group text-[#84868d] transition whitespace-nowrap hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white data-[active=true]:hover:text-[#84868d] tracking-[0] m-0 p-0 text-4 leading-5.5"
                  href="#"
                >
                  <span className="relative p-4 block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-[#84868d] after:rounded-[1px] after:transition after:-translate-x-1/2 group-hover:after:w-4/5 group-data-[active=true]:after:h-[2px] group-data-[active=true]:after:bg-white group-data-[active=true]:after:w-4/5">
                    개별 구매
                  </span>
                </a>
              </li>
              <li className="header-nav-item">
                <a
                  data-active={pathname === '/webtoon'}
                  className="group text-[#84868d] transition whitespace-nowrap hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white data-[active=true]:hover:text-[#84868d] tracking-[0] m-0 p-0 text-4 leading-5.5"
                  href="#"
                >
                  <span className="relative p-4 block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-[#84868d] after:rounded-[1px] after:transition after:-translate-x-1/2 group-hover:after:w-4/5 group-data-[active=true]:after:h-[2px] group-data-[active=true]:after:bg-white group-data-[active=true]:after:w-4/5">
                    웹툰
                  </span>
                </a>
              </li>
              <li className="header-nav-item">
                <a
                  data-active={pathname === '/party'}
                  className="group text-[#84868d] transition whitespace-nowrap hover:text-white data-[active=true]:font-semibold data-[active=true]:text-white data-[active=true]:hover:text-[#84868d] tracking-[0] m-0 p-0 text-4 leading-5.5"
                  href="#"
                >
                  <span className="relative p-4 block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-[#84868d] after:rounded-[1px] after:transition after:-translate-x-1/2 group-hover:after:w-4/5 group-data-[active=true]:after:h-[2px] group-data-[active=true]:after:bg-white group-data-[active=true]:after:w-4/5">
                    파티
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-[0] ml-5">
          {pathname !== '/search' ? (
            <Link href={'/search'}>
              <Button
                className="relative flex items-center w-[286px] py-2 px-3 bg-[#222326] rounded-2 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:w-5 [&>svg]:h-5 [&>svg]:mr-2 [&>svg]:text-[#84868d] [&>svg]:overflow-visible [&>svg]:block [&>span]:text-[#84868d] cursor-pointer transition"
                aria-label="검색"
                icon={<SearchIcon />}
              >
                <span className="tracking-[0] m-0 p-0 text-[15px] leading-5">영화 검색</span>
              </Button>
            </Link>
          ) : (
            <div className="relative flex items-center w-[286px] py-2 px-3 bg-[#222326] rounded-2 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:w-5 [&>svg]:h-5 [&>svg]:mr-2 [&>svg]:text-[#84868d] [&>svg]:overflow-visible [&>svg]:block cursor-pointer transition">
              <SearchIcon />
              <input
                ref={(node) => {
                  if (pathname === '/search' && node) {
                    node.focus();
                  }
                }}
                className="w-full p-0 m-0 bg-[#222326] appearance-none caret-[#d91e4f] outline-none border-0 text-white text-[15px] leading-5"
                placeholder="영화 검색"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEnterKeyDown(e);
                  }
                }}
                name="query"
              />
              {query ? (
                <Button
                  className="absolute w-5 h-5 border border-[#84868d] p-0 cursor-pointer bg-[#84868d] rounded-full top-1/2 right-[0.5em] z-[1] transition-all duration-[65ms] -translate-y-1/2 rotate-45 before:content-[''] before:absolute before:top-[calc(50%-1px)] before:left-[calc(50%-0.3em)] before:w-[0.6em] before:h-[2px] before:bg-white after:content-[''] after:absolute after:top-[calc(50%-1px)] after:left-[calc(50%-0.3em)] after:w-[0.6em] after:h-[2px] after:bg-white after:rotate-90 disabled:invisible disabled:opacity-0 disabled:pointer-events-none"
                  aria-label="검색어 지우기"
                  onClick={() => setQuery('')}
                ></Button>
              ) : null}
            </div>
          )}
          <Button
            className="relative bg-transparent text-white cursor-pointer transition [&>svg]:w-6 [&>svg]:h-6"
            aria-label="알림"
            icon={<AlarmIcon />}
          ></Button>
          <Button
            className="flex items-center justify-center h-8 py-0 px-3 bg-[#f82f62] text-white rounded-1 cursor-pointer transition tracking-[0] m-0 p-0 text-[13px] leading-4.5 hover:bg-[#d91e4f]"
            aria-label="로그인/회원가입"
          >
            로그인/회원가입
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
