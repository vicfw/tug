import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sg-api.mylorry.ai/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVehicleStatistics: builder.query<VehicleStatistics, void>({
      query: () => `/org/57/vehicle/statistics`,
    }),
    getDueDatesStatistics: builder.query<DueDateStatistics[], void>({
      query: () => `/org/57/vehicle/due-dates/statistics`,
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
