import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const driverApi = createApi({
  reducerPath: "driverApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDriverStatistics: builder.query<DriverStatistics, void>({
      query: () => `/org/57/driver/statistics`,
      transformResponse: (response: { data: DriverStatistics }) =>
        response.data,
    }),
    /**
     * Fetches the submitted forms for the organization with ID 57, with pagination support.
     *
     * @param pageSize - The number of forms to fetch per page.
     * @param pageNumber - The page number to fetch.
     * @returns A promise that resolves to an array of `SubmittedFormResponse` objects, containing the form data and pagination information.
     */
    getSubmittedForms: builder.query<
      SubmittedFormResponse,
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

interface SubmittedFormResponse {
  data: {
    count: number;
    filter: Filter;
    forms: Form[];
  };
}

interface Filter {
  pageSize: string;
  pageNumber: string;
}
interface Form {
  session: Session;
  isEndorsed: boolean;
}

interface Session {
  driver: Driver;
  vehicle: Vehicle;
  startMileage: number;
  endMileage: number;
  startTime: string;
}

interface Driver {
  id: number;
  firstname: string;
  lastname: string;
}

interface Vehicle {
  id: number;
  name: string;
  plateNo: string;
}
