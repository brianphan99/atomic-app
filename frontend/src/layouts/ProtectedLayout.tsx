// layouts/ProtectedLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/ui/BottomNav";
import { useAuth } from "../features/authentication/hooks/useAuth";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  // hide footer for workout routes
  const hideFooter = location.pathname.startsWith("/workout");

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      {!hideFooter && <BottomNav />}
    </div>
  );
}