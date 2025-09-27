import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export function parseError(error: unknown): ApiError {
  if (error && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<{ error?: string; message?: string }>;

    return {
      message:
        axiosError.response?.data?.error ||
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Unexpected Axios error occurred",
      status: axiosError.response?.status,
    };
  }

  // Handle general JS errors
  if (error instanceof Error) {
    return { message: error.message };
  }

  // Handle unknown
  return { message: "Unexpected error occurred" };
}
