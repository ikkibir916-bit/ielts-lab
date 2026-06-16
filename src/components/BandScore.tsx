interface Props {
  value: number;
  label: string;
  size?: "sm" | "lg";
}

export function BandScore({ value, label, size = "sm" }: Props) {
  const big = size === "lg";
  return (
    <div className={`card-academic ${big ? "p-6" : "p-4"} flex flex-col items-center text-center`}>
      <div className={`font-display ${big ? "text-6xl" : "text-3xl"} text-gold leading-none`}>
        {value.toFixed(1)}
      </div>
      <div className={`mt-2 ${big ? "text-sm" : "text-xs"} text-muted-foreground uppercase tracking-wider`}>
        {label}
      </div>
    </div>
  );
}
