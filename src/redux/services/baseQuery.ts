import { localStorageGetter, localStorageRemover } from "@/utils";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import {
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://sg-api.mylorry.ai/api",
  prepareHeaders: (headers) => {
    const token = localStorageGetter("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 403) {
      localStorageRemover("token");
    } else if (status === 500) {
      console.log("Server error! Try again later.");
    }
  }

  return result;
};
