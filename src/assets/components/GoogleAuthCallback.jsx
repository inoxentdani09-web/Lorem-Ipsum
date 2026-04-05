import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const firstName = searchParams.get("firstName") || "";
    const lastName = searchParams.get("lastName") || "";
    const email = searchParams.get("email") || "";

    if (token && email) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ firstName, lastName, email })
      );
      navigate("/");
      return;
    }

    navigate("/login");
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Signing in with Google...</h1>
        <p className="text-gray-300">Please wait while we finish your login.</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
