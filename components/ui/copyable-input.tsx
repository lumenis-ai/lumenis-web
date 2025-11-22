"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CopyableInputProps extends React.ComponentProps<typeof Input> {
  value: string
  onCopy?: () => void
}

export function CopyableInput({
  value,
  onCopy,
  className,
  ...props
}: CopyableInputProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="relative flex items-center gap-2">
      <Input
        value={value}
        readOnly
        className={cn("pr-10 cursor-pointer", className)}
        onClick={(e) => {
          e.currentTarget.select()
        }}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 h-7 w-7"
        onClick={handleCopy}
        title={copied ? "已复制" : "点击复制"}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
