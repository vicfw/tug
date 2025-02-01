import { useGetDueDatesStatisticsQuery } from "@/redux/services/vehicleApi";

export const useDueDatesChart = () => {
  const { data, isLoading, error } = useGetDueDatesStatisticsQuery();

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
    { id: 0, value: overdueCount, label: `Overdue ${overdueCount}` },
    {
      id: 1,
      value: scheduledCount,
      label: `Scheduled Count ${scheduledCount}`,
    },
  ];

  return {
    get: {
      isLoading,
      error,
      roadTaxCount,
      renewalCount,
      pieData,
    },
  };
};
