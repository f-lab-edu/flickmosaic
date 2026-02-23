import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import useSearchMovie from '@/hooks/useSearchMovie';

interface ThemeTabProps {
  list: Array<{
    name: string;
    id?: number;
  }>;
}

const ThemeTab = ({ list }: ThemeTabProps) => {
  const [activeName, setActiveName] = useState<string>(list[0]?.name ?? '');
  const { genreId, searchByGenre } = useSearchMovie();

  // genreId에 해당하는 아이템 찾기
  const selectedItem = list.find((item) => item.id?.toString() === genreId);

  useEffect(() => {
    if (genreId && selectedItem) {
      setActiveName(selectedItem.name);
    }
  }, [genreId, selectedItem]);

  const handleTabClick = (tabName: string) => {
    setActiveName(tabName);

    // 클릭한 탭에 해당하는 아이템 찾기
    const clickedItem = list.find((item) => item.name === tabName);

    if (clickedItem && clickedItem.id) {
      searchByGenre(clickedItem.id.toString());
    }
  };

  return (
    <section className="my-6 mx-0">
      <ul className="flex justify-start py-2.5 px-0 cursor-pointer">
        {list.map((item) => {
          const isActive = activeName === item.name;
          return (
            <li
              key={item.name}
              data-active={isActive}
              className="mr-2 [&>button]:py-2 [&>button]:px-4 [&>button]:text-[#84868d] [&>button]:border-[2px] [&>button]:border-[#2e2f31] [&>button]:rounded-6 [&>button]:bg-black [&>button:hover]:cursor-pointer [&>button:hover]:border-[#84868d] [&>button:hover]:border-[2px] [&>button:hover]:transition-all [&>button:hover]:duration-300 [&>button:hover]:ease-[ease] data-[active=true]:[&>button]:text-black data-[active=true]:[&>button]:bg-white data-[active=true]:[&>button:hover]:border-black data-[active=true]:[&>button:hover]:border-2"
            >
              <Button onClick={() => handleTabClick(item.name)}>{item.name} </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ThemeTab;
