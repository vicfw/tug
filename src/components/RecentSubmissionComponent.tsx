"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetSubmittedFormsQuery } from "@/redux/services/driverApi";

const DRIVER_TABLE_FIELDS = [
  { field: "lineNo", headerName: "No.", width: 20 },
  { field: "driver", headerName: "Driver", width: 180 },
  { field: "vehicle", headerName: "Vehicle", width: 120 },
  { field: "mileage", headerName: "Mileage (km)", width: 220 },
  { field: "date", headerName: "Date", width: 180 },
  { field: "endorse", headerName: "", width: 160 },
];

export default function RecentSubmissionComponent() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetSubmittedFormsQuery({
    pageSize: 25,
    pageNumber: page,
  });

  if (isLoading) return <Typography>{t("loading")}</Typography>;
  if (error) return <Typography>{t("error")}</Typography>;

  const rows = data?.map((session, index) => ({
    id: index,
    lineNo: index + 1,
    driver: `${session.driver.firstname} ${session.driver.lastname}`,
    vehicle: session.vehicle.plateNo,
    mileage: `${session.startMileage} - ${session.endMileage}`,
    date: new Date(session.startTime).toLocaleString(),
    endorse: "",
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("recentSubmissions")}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {DRIVER_TABLE_FIELDS.map((field) => (
                  <TableCell key={field.field} style={{ width: field.width }}>
                    {t(field.headerName)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.id}>
                  {DRIVER_TABLE_FIELDS.map((field) => (
                    <TableCell key={field.field}>
                      {row[field.field as keyof typeof row]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
