
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}