
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Layout e dimensões melhoradas
      "flex h-12 w-full items-center justify-between rounded-xl",
      // Background e bordas
      "bg-white/90 backdrop-blur-sm border-2 border-neutral-200",
      // Padding melhorado
      "px-4 py-3 text-sm",
      // Estados de foco e hover
      "ring-offset-background placeholder:text-neutral-500",
      "hover:border-primary/50 hover:bg-white/95",
      "focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary",
      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
      // Estados especiais
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100",
      "data-[state=open]:border-primary data-[state=open]:ring-4 data-[state=open]:ring-primary/20",
      // Texto
      "[&>span]:line-clamp-1 text-neutral-800 font-medium",
      // Transições
      "transition-all duration-200 ease-out",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-5 w-5 text-neutral-500 transition-transform duration-200 data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2 bg-white/95",
      "hover:bg-neutral-50 transition-colors duration-150",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 text-neutral-600" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-2 bg-white/95",
      "hover:bg-neutral-50 transition-colors duration-150",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4 text-neutral-600" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Z-index crítico para ficar acima de outros elementos
        "relative z-[9999]",
        // Dimensões e overflow
        "max-h-96 min-w-[8rem] overflow-hidden",
        // Background sólido e backdrop
        "bg-white border-2 border-neutral-200",
        // Sombras melhoradas
        "shadow-2xl shadow-neutral-900/20",
        // Bordas arredondadas
        "rounded-xl",
        // Cores do texto
        "text-neutral-800",
        // Animações de entrada/saída
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Posicionamento melhorado
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-2 pl-10 pr-3 text-sm font-semibold text-neutral-600",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      // Layout melhorado
      "relative flex w-full cursor-pointer select-none items-center",
      // Padding aumentado para melhor usabilidade
      "rounded-lg py-3 pl-10 pr-3 text-sm",
      // Estados de interação
      "outline-none transition-all duration-150 ease-out",
      "hover:bg-primary/10 hover:text-primary",
      "focus:bg-primary/10 focus:text-primary",
      "data-[state=checked]:bg-primary/15 data-[state=checked]:text-primary data-[state=checked]:font-medium",
      // Estados especiais
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      // Melhor contraste
      "text-neutral-700",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText className="font-medium">
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-2 h-px bg-neutral-200", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
