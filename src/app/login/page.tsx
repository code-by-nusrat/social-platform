"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Field = "email" | "password" | null;

// every color here is fixed, so dark mode cannot change it
const grayText = "text-[#737373]";

const floatingLabel = `pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm ${grayText} transition-all duration-200 peer-focus:top-3 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#007a71] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold`;

const inputStyle =
  "peer h-14 w-full rounded-xl border-2 border-[#e5e5e5] bg-white pl-11 pt-4 text-base text-[#0a0a0a] outline-none transition-colors focus:border-[#007a71] focus:ring-4 focus:ring-[#007a71]/20";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<Field>(null);
  const router = useRouter();

  
  //   e.preventDefault();

  //   if (!email || !password) {
  //     window.alert("Please fill in all required fields.");
  //     return;
  //   }

  //   const { data, error } = await authClient.signIn.email({
  //     email,
  //     password,
  //   });

  //   if (data) {
  //     router.push("/");
  //     router.refresh();
  //   }
  //   if (error) {
  //     window.alert(error.message);
  //   }
  // };
const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!email || !password) {
    toast.warn("Please fill in all required fields.");
    return;
  }

  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    // wrong email or password (or any other sign in error)
    if (error) {
      toast.error(error.message || "Invalid email or password.");
      return;
    }

    if (data) {
      toast.success("Signed in successfully!");
      router.push("/");
      router.refresh();
    }
  } catch {
    toast.error("Could not connect to the server. Please try again.");
  }
};
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const iconClass = (field: Field) =>
    `absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
      focused === field ? "text-[#007a71]" : grayText
    }`;

  return (
    <main
      style={{ colorScheme: "light" }}
      className="grid min-h-screen bg-[#f4f7f6] text-[#0a0a0a] lg:grid-cols-[1.05fr_1fr]"
    >
      {/* ───────────── Brand panel (left) ───────────── */}
      <section className="relative hidden overflow-hidden bg-[#04302d] text-white lg:order-1 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-[#00b8a9] opacity-30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] animate-pulse rounded-full bg-[#f4b942] opacity-20 blur-3xl [animation-delay:1.5s]"
        />

        {/* logo */}
        <div className="relative z-10 flex items-center justify-start gap-3">
          <div className="flex h-11 w-11 rotate-6 items-center justify-center rounded-xl bg-[#f4b942] text-[#04302d] shadow-lg">
            <Lock size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* headline */}
        <div className="relative z-10 max-w-lg space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
            <Sparkles size={14} className="text-[#f4b942]" />
            Secure sign in
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight">
            Good to see
            <br />
            you{" "}
            <span className="bg-gradient-to-r from-[#5eead4] to-[#f4b942] bg-clip-text text-transparent">
              again.
            </span>
          </h1>
          <p className="max-w-md leading-relaxed text-white/70">
            Pick up right where you left off. Your workspace, your data, your
            pace — all one sign-in away.
          </p>
        </div>

        {/* floating cards */}
        <div className="relative z-10 flex justify-start gap-4">
          <div className="-rotate-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <ShieldCheck className="mb-2 text-[#5eead4]" size={22} />
            <p className="text-sm font-semibold">Protected</p>
            <p className="text-xs text-white/60">End-to-end secure</p>
          </div>
          <div className="mt-4 rotate-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <Zap className="mb-2 text-[#f4b942]" size={22} />
            <p className="text-sm font-semibold">Instant</p>
            <p className="text-xs text-white/60">One-click access</p>
          </div>
        </div>
      </section>

      {/* ───────────── Form panel (right) ───────────── */}
      <section className="relative flex items-center justify-center px-5 py-12 lg:order-2">
        <div
          aria-hidden
          className="absolute right-0 top-0 h-64 w-64 rounded-bl-[8rem] bg-[#007a71]/10"
        />

        <div className="relative w-full max-w-md">
          {/* mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 rotate-6 items-center justify-center rounded-xl bg-[#007a71] text-white">
              <Lock size={20} />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#04302d]">
              Welcome back<span className="text-[#f4b942]">.</span>
            </h2>
            <p className={`mt-2 text-sm ${grayText}`}>
              Sign in to your account to continue.
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-[#e5e5e5] bg-white text-sm font-medium text-[#0a0a0a] transition-all hover:-translate-y-0.5 hover:border-[#007a71] hover:shadow-md"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.28 5.65c4.25-3.93 6.7-9.72 6.7-17.3z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.28-5.65c-2.02 1.35-4.6 2.15-8.62 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#e5e5e5]" />
            <span
              className={`text-[11px] font-medium tracking-widest ${grayText}`}
            >
              OR USE EMAIL
            </span>
            <div className="h-px flex-1 bg-[#e5e5e5]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className={iconClass("email")} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                value={email}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyle}
              />
              <label htmlFor="email" className={floatingLabel}>
                Email address
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={iconClass("password")} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${inputStyle} pr-12`}
              />
              <label htmlFor="password" className={floatingLabel}>
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${grayText} transition-colors hover:text-[#007a71]`}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#04302d] text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#007a71] hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Sign In</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
          </form>

          <p className={`mt-8 text-center text-sm ${grayText}`}>
            New here?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#007a71] underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}