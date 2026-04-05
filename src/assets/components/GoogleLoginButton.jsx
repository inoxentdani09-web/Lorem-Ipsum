import React, { useEffect, useRef, useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const loadGoogleSdk = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available."));
      return;
    }

    if (window.google && window.google.accounts && window.google.accounts.id) {
      resolve(window.google);
      return;
    }

    const existingScript = document.getElementById("google-oauth-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google));
      existingScript.addEventListener("error", () => reject(new Error("Google SDK failed to load.")));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-oauth-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Google SDK failed to load."));
    document.body.appendChild(script);
  });
};

const GoogleLoginButton = ({ onSuccess, onError, label = "Continue with Google", buttonClassName = null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const initializedRef = useRef(false);
  const callbackRef = useRef(null);

  callbackRef.current = async (response) => {
    if (!response || !response.credential) {
      onError?.("Google login failed. No token received.");
      return;
    }

    setIsLoading(true);
    try {
      const apiResponse = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await apiResponse.json();
      if (!apiResponse.ok) {
        throw new Error(data.error || "Google sign-in failed.");
      }

      onSuccess?.(data);
    } catch (err) {
      console.error("Google auth error:", err);
      onError?.(err.message || "Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeGoogle = async () => {
      if (!GOOGLE_CLIENT_ID) {
        onError?.("Google client ID is not configured.");
        return;
      }

      try {
        const google = await loadGoogleSdk();
        if (!google?.accounts?.id) {
          throw new Error("Google Identity Services not available.");
        }

        if (!initializedRef.current) {
          google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => callbackRef.current(response),
            ux_mode: "popup",
            auto_select: false,
          });
          initializedRef.current = true;
        }
      } catch (err) {
        console.error(err);
        onError?.("Failed to load Google SDK.");
      }
    };

    initializeGoogle();
  }, [onError]);

  const handleClick = () => {
    if (!window.google?.accounts?.id) {
      onError?.("Google SDK is not ready yet. Please try again.");
      return;
    }

    window.google.accounts.id.prompt();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={buttonClassName || "flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-gray-900 font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.35 11.1H12v2.8h5.35c-.25 1.35-1.4 4-5.35 4-3.2 0-5.8-2.65-5.8-5.9s2.6-5.9 5.8-5.9c1.85 0 3.1.8 3.8 1.5l2.6-2.5C17.6 2.55 15.35 1.4 12 1.4 6.3 1.4 1.4 6.3 1.4 12S6.3 22.6 12 22.6c6.9 0 9.9-5 9.9-11.5 0-.8-.1-1.4-.15-1.9z" fill="#4285F4"/>
      </svg>
      {isLoading ? "Signing in..." : label}
    </button>
  );
};

export default GoogleLoginButton;
