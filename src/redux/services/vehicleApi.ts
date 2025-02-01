import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getVehicleStatistics: builder.query<VehicleStatistics, void>({
      query: () => `/org/57/vehicle/statistics`,
      transformResponse: (response: { data: VehicleStatistics }) =>
        response.data,
    }),
    getDueDatesStatistics: builder.query<DueDateStatistics[], void>({
      query: () => `/org/57/vehicle/due-dates/statistics`,
      transformResponse: (response: { data: DueDateStatistics[] }) =>
        response.data,
    }),
  }),
});

export const { useGetVehicleStatisticsQuery, useGetDueDatesStatisticsQuery } =
  vehicleApi;

interface VehicleStatistics {
  vehicleCount: number;
  vehicleOnDutyCount: number;
  vehicleOffDutyCount: number;
}

interface DueDateStatistics {
  situation: string;
  status: string;
  type: string;
  tag: string | null;
  count: string;
}
