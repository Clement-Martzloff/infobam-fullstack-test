import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface OptionsSelectorProps {
  filterName: string;
  label: string;
  options: (string | number)[];
  selectedValue: string | number | null;
  onValueChange: (value: string) => void;
}

export default function OptionsSelector({
  filterName,
  label,
  options,
  selectedValue,
  onValueChange,
}: OptionsSelectorProps) {
  const selectValue = selectedValue === null ? "" : String(selectedValue);

  return (
    <Select value={selectValue} onValueChange={onValueChange}>
      <SelectTrigger id={filterName} className="col-span-3">
        <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={String(option)} value={String(option)}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
