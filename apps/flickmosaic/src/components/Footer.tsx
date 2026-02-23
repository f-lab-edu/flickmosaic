import { ReactElement } from 'react';

import BlogIcon from '@/assets/blog.svg';
import FacebookIcon from '@/assets/facebook.svg';
import InstagramIcon from '@/assets/instagram.svg';
import TwitterIcon from '@/assets/twitter.svg';

const Footer = (): ReactElement => {
  return (
    <footer className="relative bg-black pt-[27px] pb-10 px-10">
      {/* 서비스 이용약관 및 정책 */}
      <ul className="text-white/70 list-none p-0 m-0 tracking-[0] text-[10px] leading-[15px]">
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
          플릭모자이크 서비스 이용 약관
        </li>
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
          개인정보 처리 방침
        </li>
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
          플릭모자이크 서비스 이용 약관
        </li>
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
          청소년 보호정책
        </li>
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
          고객센터
        </li>
        <li className="relative inline-block align-top cursor-pointer after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20 last:after:content-none">
          채용정보
        </li>
      </ul>

      {/* 고객센터 및 연락처 정보 */}
      <ul className="mt-6 mx-0 p-0">
        <li className="text-white/70 list-none mb-1 p-0 tracking-[0] text-xs">
          <span className="inline-block w-37">고객센터(이용 및 결제 문의)</span>
          <a
            href="mailto:cs@flickmosaic.com"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
          >
            cs@flickmosaic.com
          </a>
        </li>

        <li className="text-white/70 list-none mb-1 p-0 tracking-[0] text-xs">
          <span className="inline-block w-37">광고 문의</span>
          <a
            href="mailto:ad-sales@flickmosaic.com"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
          >
            ad-sales@flickmosaic.com
          </a>
          <span className="text-white/70 before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20">
            02-515-9985 (유료)
          </span>
        </li>

        <li className="text-white/70 list-none mb-1 p-0 tracking-[0] text-xs">
          <span className="inline-block w-37">제휴 및 대외 협력</span>
          <a
            href="https://flickmosaic.team/contact"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://flickmosaic.team/contact
          </a>
          <a
            href="#"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
          >
            최신 광고 소개서
          </a>
        </li>

        <li className="text-white/70 list-none mb-1 p-0 tracking-[0] text-xs">
          <span className="inline-block w-37">B2B 구독권 구매 문의</span>
          <a
            href="mailto:jinu1005@coopnc.com"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
          >
            쿠프마케팅 (jinu1005@coopnc.com)
          </a>
        </li>

        <li className="text-white/70 list-none mb-1 p-0 tracking-[0] text-xs">
          <span className="inline-block w-37">큐레이터</span>
          <a
            href="#"
            className="text-white/70 transition hover:text-white before:content-[''] before:inline-block before:w-px before:h-2.5 before:mt-0 before:mr-[9px] before:mb-0 before:ml-0 before:align-middle before:bg-white/20"
          >
            큐레이터 이용 가이드
          </a>
        </li>
      </ul>

      {/* 회사 정보 */}
      <div className="mt-[46px] mx-0">
        <ul className="text-[#84868d] list-none p-0 mx-0 mt-0 mb-1 tracking-[0] text-xs">
          <li className="inline-block after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
            주식회사 플릭모자이크
          </li>
          <li className="inline-block after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
            대표 박태훈
          </li>
          <li className="inline-block">서울특별시 서초구 강남대로 343 신덕빌딩 3층</li>
        </ul>

        <ul className="text-[#84868d] list-none p-0 mx-0 mt-0 mb-1 tracking-[0] text-xs">
          <li className="inline-block after:content-[''] after:inline-block after:w-px after:h-2.5 after:mt-[5px] after:mx-1.5 after:mb-0 after:align-top after:bg-white/20">
            사업자등록번호 211-88-66013
          </li>
          <li className="inline-block">통신판매업 신고번호 제 2019-서울서초-0965호</li>
        </ul>

        <ul className="text-[#84868d] list-none p-0 mx-0 mt-0 mb-1 tracking-[0] text-xs">
          <li className="inline-block">호스팅 서비스 제공자 아마존웹서비시즈코리아 유한회사</li>
        </ul>
      </div>

      {/* SNS 링크 */}
      <div className="absolute top-[181px] right-12.5">
        <a
          href="#"
          className="relative inline-flex items-center justify-center w-9 h-9 ml-5 border border-white rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/10 [&>svg]:w-6 [&>svg]:h-6"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>

        <a
          href="#"
          className="relative inline-flex items-center justify-center w-9 h-9 ml-5 border border-white rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/10 [&>svg]:w-6 [&>svg]:h-6"
          aria-label="Twitter"
        >
          <TwitterIcon />
        </a>

        <a
          href="#"
          className="relative inline-flex items-center justify-center w-9 h-9 ml-5 border border-white rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/10 [&>svg]:w-6 [&>svg]:h-6"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>

        <a
          href="#"
          className="relative inline-flex items-center justify-center w-9 h-9 ml-5 border border-white rounded-full text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/10 [&>svg]:w-6 [&>svg]:h-6"
          aria-label="Blog"
        >
          <BlogIcon />
        </a>
      </div>

      {/* 저작권 정보 */}
      <div className="text-[#84868d] whitespace-pre-line m-0 p-0 tracking-[0] text-xs">
        Copyright © 2025 by FlickMosaic
      </div>
    </footer>
  );
};

export default Footer;
