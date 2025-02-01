import { useGetVehicleStatisticsQuery } from "@/redux/services/vehicleApi";

export const useVehicle = () => {
  const { data, isLoading, error } = useGetVehicleStatisticsQuery();

  return { get: { data, isLoading, error }, on: {} };
};
