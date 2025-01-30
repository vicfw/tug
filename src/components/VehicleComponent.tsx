"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetVehicleStatisticsQuery } from "@/redux/services/vehicleApi";

export default function VehicleComponent() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetVehicleStatisticsQuery();

  if (isLoading) return <Typography>{t("loading")}</Typography>;
  if (error) return <Typography>{t("error")}</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("vehicleStatistics")}
        </Typography>
        <Typography>
          {t("totalVehicles")}: {data?.vehicleCount}
        </Typography>
        <Typography>
          {t("vehiclesOnDuty")}: {data?.vehicleOnDutyCount}
        </Typography>
        <Typography>
          {t("vehiclesOffDuty")}: {data?.vehicleOffDutyCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
