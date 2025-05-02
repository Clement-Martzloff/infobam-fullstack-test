import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface FilterSelectorProps {
  filterName: string;
  label: string;
  options: (string | number)[];
  selectedValue: string | number | null;
  onValueChange: (value: string) => void;
}

export default function FilterSelector({
  filterName,
  label,
  options,
  selectedValue,
  onValueChange,
}: FilterSelectorProps) {
  console.log("selectedValue", selectedValue);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={filterName} className="text-right">
        {label}
      </Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger id={filterName} className="col-span-3">
          <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">{`All ${label}s`}</SelectItem>
          {options.map((option) => (
            <SelectItem key={String(option)} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
