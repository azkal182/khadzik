import React, {
  useCallback,
  useMemo,
  useState,
  forwardRef,
  useRef,
  Ref
} from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { fetcher } from "@/utils/fetcher";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { Command as CommandPrimitive } from "cmdk";
import { Input } from "@/components/ui/input";

interface IProduct {
  id: number;
  name: string;
  type: string;
  price: number;
  regularPrice: number;
  packingPrice: number;
}

interface AutoCompleteInputProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  placeholder?: string;
  onSelected: (selectedItem: IProduct) => void;
}

// Use forwardRef to pass ref
const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
  (
    { searchInput, setSearchInput, placeholder = "Enter Search", onSelected },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
          close();
        }
      },
      [close]
    );

    const debouncedSearchInput = useDebounce(searchInput, 500);

    const { data, isLoading } = useSWR(
      `http://localhost:3000/api/products?name=${debouncedSearchInput}`,
      fetcher
    );

    const predictions = useMemo(
      () => (Array.isArray(data) ? data : []),
      [data]
    );

    const handleSelect = (prediction: IProduct) => {
      onSelected(prediction);
      setSearchInput(""); // Clear the search input
      close(); // Close the dropdown
    };

    return (
      <Command
        shouldFilter={false}
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="bg-transparent">
          <Input
            ref={ref} // Directly forward ref to the Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              if (predictions.length > 0) {
                open();
              }
            }}
            onBlur={close}
            onFocus={open}
            onKeyDown={(e) => {
              if (
                searchInput === "" &&
                (e.key === "ArrowUp" || e.key === "ArrowDown")
              ) {
                e.preventDefault(); // Prevent arrow keys when input is empty
              }
            }}
            placeholder={placeholder}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        {isOpen && searchInput.length > 0 && (
          <div className="relative animate-in fade-in-0 zoom-in-95 z-[9999]">
            <CommandList>
              <div className="absolute top-1.5 z-50 w-full">
                <CommandGroup className="relative max-h-40 z-50 min-w-[8rem] overflow-y-scroll rounded-md border shadow-md bg-background">
                  {isLoading ? (
                    <div className="h-28 flex items-center justify-center">
                      <Loader2 className="size-6 animate-spin" />
                    </div>
                  ) : (
                    <>
                      {predictions.length > 0 ? (
                        predictions.map((prediction) => (
                          <CommandPrimitive.Item
                            key={prediction.id}
                            value={prediction.id}
                            onSelect={() => handleSelect(prediction)}
                            className="flex select-text flex-col cursor-pointer gap-0.5 h-max p-2 px-3 rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground items-start"
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {prediction.name}{" "}
                            {prediction.type ? `(${prediction.type})` : null}
                          </CommandPrimitive.Item>
                        ))
                      ) : (
                        <CommandEmpty>
                          <div className="py-4 flex items-center justify-center">
                            {searchInput === ""
                              ? "Please enter an name product"
                              : "No address found"}
                          </div>
                        </CommandEmpty>
                      )}
                    </>
                  )}
                </CommandGroup>
              </div>
            </CommandList>
          </div>
        )}
      </Command>
    );
  }
);

AutoCompleteInput.displayName = "AutoCompleteInput"; // Set display name for debugging

export default AutoCompleteInput;
