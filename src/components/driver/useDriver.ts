import { useGetDriverStatisticsQuery } from "@/redux/services/driverApi";

export const useDriver = () => {
  const { data, isLoading, error } = useGetDriverStatisticsQuery();

  return { get: { data, isLoading, error } };
};
