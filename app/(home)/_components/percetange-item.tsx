import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  value: number;
  title: string;
}

const PercentageItem = ({ title, icon, value }: PercentageItemProps) => {
  {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        <p className="text-sm font-bold">{value}%</p>
      </div>
    );
  }
};

export default PercentageItem;
