import React from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      <div className="p-6 relative w-full max-w-3/4 flex flex-col gap-2 rounded-md border border-zinc-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-950">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="ml-auto"
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
}
