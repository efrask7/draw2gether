"use client"

import { CanvaProvider } from "@/context/CanvaContext";
import { PropsWithChildren } from "react";

function GameLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-full">
      <CanvaProvider>
        {children}
      </CanvaProvider>
    </main>
  )
}

export default GameLayout
