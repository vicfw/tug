"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useDriver } from "./useDriver";

export default function DriverComponent() {
  const { get } = useDriver();
  if (get.isLoading) return <Typography>Loading...</Typography>;
  if (get.error) return <Typography>Error</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Driver Statistics
        </Typography>
        <Typography>Total Drivers: {get.data?.driverCount}</Typography>
        <Typography>On Duty: {get.data?.onDutyCount}</Typography>
        <Typography>Off Duty: {get.data?.offDutyCount}</Typography>
      </CardContent>
    </Card>
  );
}
