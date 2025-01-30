import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const driverApi = createApi({
  reducerPath: "driverApi",
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
    getDriverStatistics: builder.query<DriverStatistics, void>({
      query: () => `/org/57/driver/statistics`,
    }),
    getSubmittedForms: builder.query<
      SubmittedForm[],
      { pageSize: number; pageNumber: number }
    >({
      query: ({ pageSize, pageNumber }) =>
        `/org/57/driver/submitted-forms?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    }),
  }),
});

export const { useGetDriverStatisticsQuery, useGetSubmittedFormsQuery } =
  driverApi;

interface DriverStatistics {
  driverCount: number;
  onDutyCount: number;
  offDutyCount: number;
}

interface SubmittedForm {
  driver: {
    firstname: string;
    lastname: string;
  };
  vehicle: {
    plateNo: string;
  };
  startMileage: number;
  endMileage: number;
  startTime: string;
}
