// Progress.jsx
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Progress({
  value = 0,
  label = "Label",
  color = "#0ea5e9",
}) {
  const chartData = [
    {
      name: label,
      visitors: value,
      fill: color,
    },
  ];

  return (
    <Card className="flex flex-col max-w-sm mx-auto w-full">
      <CardHeader className=" text-center pb-0">
        <CardTitle>{label}</CardTitle>
        <CardDescription>
          January - {new Date().toLocaleString("default", { month: "long" })}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 mx-auto">
        <div className="mx-auto aspect-square max-h-[250px] w-full">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={360}
            innerRadius={80}
            outerRadius={110}
            width={250}
            height={250}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none font-bold">
          Showing total {label.toLowerCase()} for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
