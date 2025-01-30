"use client";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useLogin } from "./useLogin";

export default function LoginForm() {
  const { get, on } = useLogin();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          p: 4,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Image src="" alt="Logo" width={150} height={50} />
        {get.errorMessage && (
          <Alert severity="error" variant="filled">
            {get.errorMessage}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={on.handleSubmit(on.onSubmit)}
          sx={{
            width: "100%",
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            label="Email"
            required
            error={!!get.errors.email}
            helperText={get.errors.email?.message}
            {...get.register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            required
            error={!!get.errors.password}
            helperText={get.errors.password?.message}
            {...get.register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.primary.main,
              cursor: "pointer",
              alignSelf: "flex-start",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            FORGOT PASSWORD?
          </Typography>

          <FormControlLabel
            sx={{
              color: "gray",
            }}
            control={
              <Checkbox
                {...get.register("terms", {
                  required: "You must accept the terms and conditions",
                })}
              />
            }
            label="I accept the terms and conditions"
          />
          {get.errors.terms && (
            <Typography variant="caption" color="error">
              {get.errors.terms.message}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={get.isLoading || Object.keys(get.errors).length > 0}
            loading={get.isLoading}
            sx={{
              bgcolor: "#e0e0e0",
              color: "black",
              "&:hover": {
                bgcolor: "#d5d5d5",
              },
            }}
          >
            LOGIN
          </Button>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#e0e0e0",
              color: "black",
              "&:hover": {
                borderColor: "#d5d5d5",
                bgcolor: "transparent",
              },
            }}
          >
            LOGIN WITH GOOGLE
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
