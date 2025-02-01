"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Grid2 } from "@mui/material";
import DriverComponent from "@/components/driver/DriverComponent";
import VehicleComponent from "@/components/vehicle/VehicleComponent";
import DueDatesChartComponent from "@/components/due-dates-chart/DueDatesChartComponents";
import RecentSubmissionComponent from "@/components/recent-submission/RecentSubmissionComponent";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login page
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
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
