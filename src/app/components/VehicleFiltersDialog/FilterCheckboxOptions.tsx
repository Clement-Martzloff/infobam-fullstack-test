"use client";

import { Checkbox } from "@/src/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface FilterCheckboxOptionsProps<T extends FieldValues> {
  filterName: Path<T>;
  label: string;
  options: (string | number)[];
}

export default function FilterCheckboxOptions<T extends FieldValues>({
  filterName,
  label,
  options,
}: FilterCheckboxOptionsProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={filterName}
      render={({ field }) => {
        const selectedValues: (string | number)[] =
          (field.value as (string | number)[] | null) || [];

        return (
          <FormItem>
            <div className="mb-2">
              <FormLabel className="text-base">{label}</FormLabel>
              <FormDescription>{`Choose the ${label.toLowerCase()}s`}</FormDescription>
            </div>
            {options.map((option) => {
              const optionValue =
                typeof option === "number" ? option : String(option);

              return (
                <FormItem
                  key={String(option)}
                  className="flex flex-row items-center gap-3 space-y-0 space-x-3"
                >
                  <FormControl>
                    <Checkbox
                      className="m-0"
                      checked={selectedValues.includes(optionValue)}
                      onCheckedChange={(checked) => {
                        const newValues = checked
                          ? [...selectedValues, optionValue]
                          : selectedValues.filter(
                              (value) => value !== optionValue,
                            );
                        field.onChange(
                          newValues.length === 0 ? null : newValues,
                        );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {String(option).charAt(0).toUpperCase() +
                      String(option).slice(1).toLowerCase()}
                  </FormLabel>
                </FormItem>
              );
            })}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
