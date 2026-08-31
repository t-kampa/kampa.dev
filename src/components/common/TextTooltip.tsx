import type { ReactElement, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  text: ReactNode;
  render: ReactElement;
}

export default function TextTooltip({ text, render }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger render={render} />
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}
