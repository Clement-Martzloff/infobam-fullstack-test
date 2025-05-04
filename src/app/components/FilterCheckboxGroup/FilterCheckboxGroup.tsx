"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";

interface FilterCheckboxGroupProps {
  filterName: string;
  label: string;
  options: (string | number)[];
  selectedValues: (string | number)[];
  onValueChange: (values: (string | number)[]) => void;
}

export default function FilterCheckboxGroup({
  filterName,
  label,
  options,
  selectedValues,
  onValueChange,
}: FilterCheckboxGroupProps) {
  const handleCheckboxChange = (
    option: string | number,
    isChecked: boolean,
  ) => {
    const stringOption = String(option);
    let newSelectedValues = selectedValues.map(String);

    if (isChecked) {
      if (!newSelectedValues.includes(stringOption)) {
        newSelectedValues = [...newSelectedValues, stringOption];
      }
    } else {
      newSelectedValues = newSelectedValues.filter(
        (value) => value !== stringOption,
      );
    }

    const finalSelectedValues = newSelectedValues.map((val) => {
      const originalOption = options.find((opt) => String(opt) === val);
      if (originalOption !== undefined) {
        return originalOption;
      }
      return val;
    });

    onValueChange(finalSelectedValues);
  };

  return (
    <div className="grid gap-2">
      <Label className="text-lg font-semibold">{label}</Label>
      <div className="grid gap-1">
        {options.map((option) => {
          const stringOption = String(option);
          const isSelected = selectedValues.map(String).includes(stringOption);
          return (
            <div key={stringOption} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterName}-${stringOption}`}
                checked={isSelected}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option, checked === true)
                }
              />
              <Label htmlFor={`${filterName}-${stringOption}`}>{option}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
