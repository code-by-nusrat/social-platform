"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  ArrowRight,
  Check,
  Rocket,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
type Field = "name" | "email" | "imageUrl" | "password" | null;

const floatingLabel =
  "pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-3 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-[#007a71] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold";

const inputStyle =
  "peer h-14 rounded-xl border-2 bg-white pl-11 pt-4 focus-visible:border-[#007a71] focus-visible:ring-[#007a71]/20";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [password, setPassword] = useState("");
  // const [agree, setAgree] = useState(false);
  const [focused, setFocused] = useState<Field>(null);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as { name: string, password: string, imageUrl: string, email: string };
    console.log(user, 'user')

    if (!name || !email || !password) {
      window.alert("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      window.alert("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      window.alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      window.alert("Password must contain at least one lowercase letter.");
      return;
    }

    // if (!agree) {
    //   window.alert("Please accept the Terms and Privacy Policy.");
    //   return;
    // }

    const { data, error } = await authClient.signUp.email({
      ...user
    })
    if (data) {
      router.push('/')
    }
    if (error) {
      window.alert(error.message);
    }
    // updateProfile(user, { displayName: name, photoURL: imageUrl || null });
  };

  const handleGoogleSignup = async() => {
    const data = await authClient.signIn.social({
    provider: "google",
  });
  };

  const iconClass = (field: Field) =>
    `absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${focused === field ? "text-[#007a71]" : "text-muted-foreground"
    }`;

  return (
    <main className="grid min-h-screen bg-[#f4f7f6] lg:grid-cols-[1fr_1.05fr]">
      {/* ───────────── Form panel ───────────── */}
      <section className="relative flex items-center justify-center px-5 py-12">
        <div
          aria-hidden
          className="absolute left-0 top-0 h-64 w-64 rounded-br-[8rem] bg-[#007a71]/10"
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
              Create your account<span className="text-[#f4b942]">.</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              It takes less than a minute to get started.
            </p>
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full gap-3 rounded-xl border-2 bg-white transition-all hover:-translate-y-0.5 hover:border-[#007a71] hover:shadow-md"
            onClick={handleGoogleSignup}
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.28 5.65c4.25-3.93 6.7-9.72 6.7-17.3z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.28-5.65c-2.02 1.35-4.6 2.15-8.62 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z" />
            </svg>
            Sign up with Google
          </Button>

          <div className="my-7 flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-[11px] font-medium tracking-widest text-muted-foreground">
              OR USE EMAIL
            </span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <User className={iconClass("name")} />
              <Input
                id="name"
                type="text"
                name='name'
                placeholder=" "
                value={name}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputStyle}
              />
              <Label htmlFor="name" className={floatingLabel}>
                Full name
              </Label>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className={iconClass("email")} />
              <Input
                id="email"
                name='email'
                type="email"
                placeholder=" "
                value={email}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyle}
              />
              <Label htmlFor="email" className={floatingLabel}>
                Email address
              </Label>
            </div>

            {/* Image URL (optional) */}
            <div className="relative">
              <ImageIcon className={iconClass("imageUrl")} />
              <Input
                id="imageUrl"
                name='imageUrl'
                type="url"
                placeholder=" "
                value={imageUrl}
                onFocus={() => setFocused("imageUrl")}
                onBlur={() => setFocused(null)}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageError(false);
                }}
                className={`${inputStyle} pr-16`}
              />
              <Label htmlFor="imageUrl" className={floatingLabel}>
                Profile image URL (optional)
              </Label>

              {/* live preview */}
              {imageUrl && !imageError && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Profile preview"
                  onError={() => setImageError(true)}
                  className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border-2 border-[#007a71] object-cover"
                />
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className={iconClass("password")} />
              <Input
                id="password"
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onChange={(e) => (
                  setPassword(e.target.value))}
                required
                className={`${inputStyle} pr-12`}
              />
              <Label htmlFor="password" className={floatingLabel}>
                Password
              </Label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-[#007a71]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            {/* Terms */}
            {/* <label className="flex cursor-pointer select-none items-start gap-2.5 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#007a71]"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-[#007a71] hover:underline"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#007a71] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label> */}

            {/* Submit */}
            <Button
              type="submit"
              className="group relative h-12 w-full gap-2 overflow-hidden rounded-xl bg-[#04302d] text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#007a71] hover:shadow-xl"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Register</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#007a71] underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────── Brand panel ───────────── */}
      <section className="relative hidden overflow-hidden bg-[#04302d] text-white lg:flex lg:flex-col lg:justify-between lg:p-14">
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
          className="absolute -right-24 -top-24 h-96 w-96 animate-pulse rounded-full bg-[#00b8a9] opacity-30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 h-[28rem] w-[28rem] animate-pulse rounded-full bg-[#f4b942] opacity-20 blur-3xl [animation-delay:1.5s]"
        />

        {/* logo */}
        <div className="relative z-10 flex items-center justify-end gap-3">

          <div className="flex h-11 w-11 -rotate-6 items-center justify-center rounded-xl bg-[#f4b942] text-[#04302d] shadow-lg">
            <Lock size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* headline */}
        <div className="relative z-10 max-w-lg space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
            <Rocket size={14} className="text-[#f4b942]" />
            Join us today
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight">
            Your journey
            <br />
            starts{" "}
            <span className="bg-gradient-to-r from-[#5eead4] to-[#f4b942] bg-clip-text text-transparent">
              right here.
            </span>
          </h1>

          {/* benefits */}
          <ul className="space-y-3 pt-2">
            {[
              "Free to start, no credit card needed",
              "Your data stays private and secure",
              "Switch devices without losing a thing",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4b942] text-[#04302d]">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* floating card */}
        <div className="relative z-10 flex justify-end">
          <div className="-rotate-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
            <Sparkles className="mb-2 text-[#f4b942]" size={22} />
            <p className="text-sm font-semibold">Ready in 60 seconds</p>
            <p className="text-xs text-white/60">
              Create an account and jump right in.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
