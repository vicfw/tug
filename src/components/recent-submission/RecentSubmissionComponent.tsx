"use client";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRecentSubmission } from "./useRecentSubmission";

const DRIVER_TABLE_FIELDS = [
  { field: "lineNo", headerName: "No.", width: 20 },
  { field: "driver", headerName: "Driver", width: 180 },
  { field: "vehicle", headerName: "Vehicle", width: 120 },
  { field: "mileage", headerName: "Mileage (km)", width: 220 },
  { field: "date", headerName: "Date", width: 180 },
  { field: "endorse", headerName: "", width: 160 },
];

export default function RecentSubmissionComponent() {
  const { get, on } = useRecentSubmission();

  if (get.isLoading) return <Typography>Loading</Typography>;
  if (get.error) return <Typography>Error</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Submissions
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="table">
            <TableHead>
              <TableRow>
                {DRIVER_TABLE_FIELDS.map((field) => (
                  <TableCell key={field.field} style={{ width: field.width }}>
                    {field.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {get.rows?.map((row) => (
                <TableRow key={row.id}>
                  {DRIVER_TABLE_FIELDS.map((field) => {
                    return (
                      <TableCell key={field.field}>
                        {field.field === "endorse" ? (
                          row.endorse ? (
                            <Alert
                              variant="outlined"
                              severity="success"
                              sx={{
                                padding: "1px 8px",
                                minHeight: "24px",
                                fontSize: "0.75rem",
                                lineHeight: 1.6,
                              }}
                            >
                              Endorsed
                            </Alert>
                          ) : null
                        ) : (
                          row[field.field as keyof typeof row]
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={get.count}
            page={get.page}
            onChange={on.handleChangePage}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
