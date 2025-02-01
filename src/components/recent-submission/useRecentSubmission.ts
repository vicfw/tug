import { useGetSubmittedFormsQuery } from "@/redux/services/driverApi";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const PAGE_SIZE = 25;

export const useRecentSubmission = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetSubmittedFormsQuery({
    pageSize: PAGE_SIZE,
    pageNumber: page,
  });

  const [count, setCount] = useState(0);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const rows = data?.data.forms?.map((form, index) => ({
    id: index,
    lineNo: index + 1,
    driver: `${form.session.driver?.firstname ?? ""} ${
      form.session.driver?.lastname ?? ""
    }`,
    vehicle: form.session.vehicle?.plateNo ?? "N/A",
    mileage:
      form.session.startMileage && form.session.endMileage
        ? `${form.session.startMileage} - ${form.session.endMileage}`
        : "N/A",
    date: form.session.startTime
      ? format(new Date(Number(form.session.startTime) * 1000), "d/M/yyyy") // Converts UNIX timestamp to date
      : "N/A",
    endorse: form.isEndorsed ?? false,
  }));

  useEffect(() => {
    if (data?.data.forms.length) {
      setCount(Math.round(data?.data.count / PAGE_SIZE));
    }
  }, [data]);

  return {
    get: { rows, isLoading, error, page, count },
    on: { handleChangePage },
  };
};
