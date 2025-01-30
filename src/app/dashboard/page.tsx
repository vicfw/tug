"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DriverComponent from "@/components/DriverComponent";
import VehicleComponent from "@/components/VehicleComponent";
import DueDatesChartComponent from "@/components/DueDatesChartComponents";
import RecentSubmissionComponent from "@/components/RecentSubmissionComponent";

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login page
    const token = localStorage.getItem("token");
    if (!token) {
      //   router.push("/");
    }
  }, [router]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t("dashboard")}
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <DriverComponent />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <VehicleComponent />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <DueDatesChartComponent />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <RecentSubmissionComponent />
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
