export type UserRole = "student" | "instructor" | "center-owner" | "admin";

export interface HealthResponse {
  ok: boolean;
  service: string;
}
