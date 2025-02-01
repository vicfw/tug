"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useVehicle } from "./useVehicle";

export default function VehicleComponent() {
  const { get } = useVehicle();

  if (get.isLoading) return <Typography>Loading</Typography>;
  if (get.error) return <Typography>Error</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          VehicleStatistics
        </Typography>
        <Typography>Total Vehicles: {get.data?.vehicleCount}</Typography>
        <Typography>Vehicles OnDuty: {get.data?.vehicleOnDutyCount}</Typography>
        <Typography>
          Vehicles OffDuty: {get.data?.vehicleOffDutyCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
