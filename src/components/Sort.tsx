'use client';
import { SortValue } from '@/types/global';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { SortList, SortTitle } from '@/lib/constants';
import { useSortStore } from '@/store';

export default function Sort() {
  const { setValue } = useSortStore();
  const handleValueChange = (values: string[]) => {
    const value = values[0] as SortValue;
    setValue(value);
  };
  return (
    <div className="w-64 py-4">
      <p className="m-5 text-xl">{SortTitle}</p>
      <ToggleGroup
        className="flex-col gap-3 pr-5"
        defaultValue={[SortList[0].value]}
        onValueChange={handleValueChange}
      >
        {SortList.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
          >
            {item.text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
