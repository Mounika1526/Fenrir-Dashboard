import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import MetaIcon from "../components/icons/meta";

const features = [
  "Effortlessly spider and map targets to uncover hidden security flaws",
  "Deliver high-quality, validated findings in hours, not weeks.",
  "Generate professional, enterprise-grade security reports automatically.",
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!agreed) e.agreed = "You must accept the terms";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 900);
  }

  function field(id, label, type = "text") {
    return (
      <div>
        <input
          type={type}
          placeholder={label}
          value={form[id]}
          onChange={(ev) => setForm((f) => ({ ...f, [id]: ev.target.value }))}
          aria-label={label}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900
            placeholder-gray-400 outline-none bg-white
            focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/20 transition-all
            ${errors[id] ? "border-red-400" : "border-gray-300"}`}
        />
        {errors[id] && (
          <p className="text-xs text-red-500 mt-1">{errors[id]}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto"
      style={{
          background: `
            radial-gradient(ellipse 60% 55% at 5% 5%,   rgba(6,150,115,0.18)  0%, transparent 65%),
            radial-gradient(ellipse 90% 80% at 100% 100%, rgba(230,75,8,0.92)  0%, rgba(170,30,4,0.65) 40%, transparent 72%),
            #0d0d0d
          `,
        }}
    >
      <div className="absolute top-5 left-6 z-20 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#0CC8A8] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-black"
            fill="currentColor"
          >
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white tracking-tight">aps</span>
      </div>

      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="absolute top-4 right-5 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
          flex items-center justify-center text-white/70 hover:text-white transition-colors"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isDark ? (
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </svg>
      </button>

      <div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center
        min-h-screen gap-12 lg:gap-16 px-6 py-20 max-w-6xl mx-auto"
      >
        <div className="flex-1 flex flex-col gap-8 text-white max-w-lg">
          <div>
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Expert level Cybersecurity in{" "}
              <span className="text-[#0CC8A8]">hours</span> not weeks.
            </h1>
          </div>

          <div>
            <p className="text-sm font-bold text-white mb-4">What's included</p>
            <ul className="flex flex-col gap-3">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                >
                  <svg
                    className="w-4 h-4 text-[#0CC8A8] shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 text-[#00B67A]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm font-semibold text-gray-200">
                Trustpilot
              </span>
            </div>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Rated 4.5/5.0</strong>{" "}
              <span className="text-gray-500">(100k+ reviews)</span>
            </p>
          </div>
        </div>

        <div className="login-inputs w-full max-w-md shrink-0 bg-white rounded-2xl shadow-2xl px-8 py-9">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Sign up
          </h2>
          <p className="text-sm text-center text-gray-500 mb-7">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#0CC8A8] font-medium hover:underline"
            >
              Log in
            </button>
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {field("firstName", "First name*")}

            {field("lastName", "Last name*")}

            {field("email", "Email address*", "email")}

            <div>
              <div
                className={`flex items-center rounded-lg border bg-white
                px-4 py-3 gap-2 transition-all
                focus-within:border-[#0CC8A8] focus-within:ring-2 focus-within:ring-[#0CC8A8]/20
                ${errors.password ? "border-red-400" : "border-gray-300"}`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (8+ characters)*"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  aria-label="Password"
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {showPassword ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#0CC8A8] shrink-0"
                  aria-label="Agree to terms"
                />
                <span className="text-sm text-gray-600 leading-relaxed">
                  I agree to Aps's{" "}
                  <button
                    type="button"
                    className="text-[#0CC8A8] font-medium hover:underline"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and acknowledge the{" "}
                  <button
                    type="button"
                    className="text-[#0CC8A8] font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.agreed && (
                <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#0CC8A8] hover:bg-[#0ab394] active:bg-[#089e82]
                text-white font-semibold py-3.5 text-sm transition-colors
                disabled:opacity-70 disabled:cursor-not-allowed mt-1 rounded-3xl"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>

            <div className="grid grid-cols-3 gap-3 mt-1">
              <button
                type="button"
                aria-label="Continue with Apple"
                className="flex items-center justify-center rounded-xl bg-black
                  hover:bg-gray-900 text-white py-3 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Continue with Google"
                className="flex items-center justify-center rounded-xl bg-white
                  hover:bg-gray-50 border border-gray-200 py-3 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Continue with Meta"
                className="flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 border border-gray-200 py-3 transition-colors"
              >
                <MetaIcon className="w-6 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
