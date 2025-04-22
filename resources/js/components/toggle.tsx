import { useState, FC } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  initial?: boolean;
  onChange?: (value: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ initial = false, onChange }) => {
  const [enabled, setEnabled] = useState<boolean>(initial);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    onChange?.(newState);
  };

  return (
    <div
      onClick={handleToggle}
      className={cn(
        "relative w-20 h-9 flex items-center rounded-full cursor-pointer px-1 transition-colors duration-300",
        enabled ? "bg-green-500" : "bg-gray-400"
      )} 
    >
      {/* NO text on the left, YES on the right */}
      <span
        className={cn(
          "text-white text-xs font-bold w-full text-center transition-opacity duration-200",
          enabled ? "opacity-0" : "opacity-100"
        )}
      >
        NO
      </span>
      <span
        className={cn(
            "absolute text-white text-xs font-bold transition-opacity duration-200",
            enabled ? "opacity-100" : "opacity-0"
        )}
        style={{ left: "14px" }}
        >
        YES
        </span>

      {/* Toggle knob */}
      <div
        className={cn(
          "absolute top-[2px] left-[2px] h-7 w-7 bg-white rounded-full shadow-md transition-transform duration-300",
          enabled ? "translate-x-[44px]" : "translate-x-0"
        )}
      />
    </div>
  );
};

export default Toggle;
