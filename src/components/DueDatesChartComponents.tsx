"use client";

import { Card, CardContent, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTranslation } from "react-i18next";
import { useGetDueDatesStatisticsQuery } from "@/redux/services/vehicleApi";

export default function DueDatesChartComponent() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetDueDatesStatisticsQuery();

  if (isLoading) return <Typography>{t("loading")}</Typography>;
  if (error) return <Typography>{t("error")}</Typography>;

  const overdueCount =
    data
      ?.filter((item) => item.situation === "overdue")
      .reduce((acc, item) => acc + Number.parseInt(item.count), 0) || 0;
  const scheduledCount =
    data
      ?.filter((item) => item.situation !== "overdue")
      .reduce((acc, item) => acc + Number.parseInt(item.count), 0) || 0;

  const roadTaxCount =
    data
      ?.filter((item) => item.type === "road-tax")
      .reduce((acc, item) => acc + Number.parseInt(item.count), 0) || 0;
  const renewalCount =
    data
      ?.filter((item) => item.tag === "renew")
      .reduce((acc, item) => acc + Number.parseInt(item.count), 0) || 0;

  const pieData = [
    { id: 0, value: overdueCount, label: t("overdue") },
    { id: 1, value: scheduledCount, label: t("scheduled") },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("dueDatesChart")}
        </Typography>
        <PieChart series={[{ data: pieData }]} width={400} height={200} />
        <Typography>
          {t("roadTax")}: {roadTaxCount}
        </Typography>
        <Typography>
          {t("renewal")}: {renewalCount}
        </Typography>
      </CardContent>
    </Card>
  );
}
