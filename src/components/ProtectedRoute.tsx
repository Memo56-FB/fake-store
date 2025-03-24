import { Layout } from "@/features/layout/Layout";
import { Navigate, Outlet } from "react-router";

type ProtectedRouteProps = {
  token: string | null;
  redirectPath?: string;
};

export const ProtectedRoute = ({ token, redirectPath = "/login" }: ProtectedRouteProps) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
};