"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDueDatesChart } from "./useDueDatesChart";

export default function DueDatesChartComponent() {
  const { get } = useDueDatesChart();

  if (get.isLoading) return <Typography>Loading</Typography>;
  if (get.error) return <Typography>Error</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          DueDates Chart
        </Typography>
        <PieChart
          series={[
            {
              data: get.pieData,
              innerRadius: 60,
            },
          ]}
          width={500}
          height={200}
        />
        <Typography>Road Tax: {get.roadTaxCount}</Typography>
        <Typography>Renewal: {get.renewalCount}</Typography>
      </CardContent>
    </Card>
  );
}
