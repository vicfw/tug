"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetDriverStatisticsQuery } from "@/redux/services/driverApi";

export default function DriverComponent() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetDriverStatisticsQuery();

  if (isLoading) return <Typography>{t("loading")}</Typography>;
  if (error) return <Typography>{t("error")}</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("driverStatistics")}
        </Typography>
        <Typography>
          {t("totalDrivers")}: {data?.driverCount}
        </Typography>
        <Typography>
          {t("onDuty")}: {data?.onDutyCount}
        </Typography>
        <Typography>
          {t("offDuty")}: {data?.offDutyCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
