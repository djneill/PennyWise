"use client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function GoogleSignInButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] text-white rounded-md"
    >
      {/* Google Logo SVG */}
      <svg
        className="h-5 w-5"
        viewBox="0 0 488 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            fill="#4285F4"
            d="M488 261.8C488 403.3 391.1 504 244 504 109.5 504 0 394.5 0 260S109.5 16 244 16c66.2 0 121.5 24.1 163.1 63.7l-66.2 63.7C312.6 97.7 282.4 88 244 88c-90.5 0-164 73.5-164 164s73.5 164 164 164c83.7 0 137.7-47.8 148.2-114.8H244v-91.2h244c2.2 12.7 4 25.7 4 41z"
          />
          <path
            fill="#34A853"
            d="M244 504c66.2 0 121.5-24.1 163.1-63.7l-66.2-63.7C312.6 414.3 282.4 424 244 424c-90.5 0-164-73.5-164-164s73.5-164 164-164c38.4 0 68.6 9.7 96.9 27.4l66.2-63.7C365.5 40.1 310.2 16 244 16 109.5 16 0 125.5 0 260s109.5 244 244 244z"
          />
          <path
            fill="#FBBC05"
            d="M488 261.8c0-15.3-1.8-28.3-4-41H244v91.2h148.2c-10.5 67-64.5 114.8-148.2 114.8-90.5 0-164-73.5-164-164s73.5-164 164-164c38.4 0 68.6 9.7 96.9 27.4l66.2-63.7C365.5 40.1 310.2 16 244 16 109.5 16 0 125.5 0 260s109.5 244 244 244c147.1 0 244-100.7 244-242.2z"
          />
          <path
            fill="#EA4335"
            d="M488 261.8c0-15.3-1.8-28.3-4-41H244v91.2h148.2c-10.5 67-64.5 114.8-148.2 114.8-90.5 0-164-73.5-164-164s73.5-164 164-164c38.4 0 68.6 9.7 96.9 27.4l66.2-63.7C365.5 40.1 310.2 16 244 16 109.5 16 0 125.5 0 260s109.5 244 244 244c147.1 0 244-100.7 244-242.2z"
          />
        </g>
      </svg>
      {children}
    </button>
  );
}
