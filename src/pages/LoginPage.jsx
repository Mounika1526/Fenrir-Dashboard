import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const CheckIcon = () => (
  <svg className="w-4 h-4 text-[#0CC8A8] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const EyeIcon = ({ open }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    {open
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" /></>
    }
  </svg>
)

const features = [
  'Effortlessly spider and map targets to uncover hidden security flaws',
  'Deliver high-quality, validated findings in hours, not weeks.',
  'Generate professional, enterprise-grade security reports automatically.',
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { isDark, toggle } = useTheme()

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.password.length < 8) e.password = 'Minimum 8 characters'
    if (!agreed) e.agreed = 'You must accept the terms'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  const field = (id, label, type = 'text') => (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type={type}
        placeholder={label}
        value={form[id]}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none
          transition-colors duration-150
          bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/20
          ${errors[id] ? 'border-red-400' : 'border-gray-300'}`}
        aria-label={label}
      />
      {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
    </div>
  )

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 65% 55% at 15% 15%, rgba(12,200,168,0.18) 0%, transparent 70%),
          radial-gradient(ellipse 55% 65% at 85% 90%, rgba(200,55,15,0.30) 0%, transparent 70%),
          radial-gradient(ellipse 45% 40% at 65% 70%, rgba(160,70,10,0.18) 0%, transparent 60%),
          #080f0d
        `,
      }}
    >
      {/* Noise grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
        aria-label="Toggle theme"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d={isDark
            ? 'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z'
            : 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'}
          />
        </svg>
      </button>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── Left: branding ── */}
        <div className="flex-1 text-white max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-full bg-[#0CC8A8] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">aps</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
            Expert level Cybersecurity in{' '}
            <span className="text-[#0CC8A8]">hours</span> not weeks.
          </h1>

          <div className="mb-10">
            <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">What's included</p>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckIcon />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trustpilot */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-200">Trustpilot</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            <strong className="text-white">Rated 4.5/5.0</strong>{' '}
            <span className="text-gray-500">(100k+ reviews)</span>
          </p>
        </div>

        {/* ── Right: signup card ── */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-9">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Sign up</h2>
          <p className="text-sm text-center text-gray-500 mb-7">
            Already have an account?{' '}
            <button className="text-[#0CC8A8] font-medium hover:underline">Log in</button>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              {field('firstName', 'First name*')}
              {field('lastName',  'Last name*')}
            </div>

            {field('email', 'Email address*', 'email')}

            {/* Password */}
            <div className="flex flex-col gap-1">
              <div className={`flex items-center rounded-lg border bg-white px-4 py-3 gap-2
                transition-colors duration-150 focus-within:border-[#0CC8A8] focus-within:ring-2 focus-within:ring-[#0CC8A8]/20
                ${errors.password ? 'border-red-400' : 'border-gray-300'}`}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password (8+ characters)*"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#0CC8A8]"
                  aria-label="Agree to terms"
                />
                <span className="text-sm text-gray-600">
                  I agree to Aps's{' '}
                  <button type="button" className="text-[#0CC8A8] hover:underline font-medium">Terms & Conditions</button>
                  {' '}and acknowledge the{' '}
                  <button type="button" className="text-[#0CC8A8] hover:underline font-medium">Privacy Policy</button>
                </span>
              </label>
              {errors.agreed && <p className="text-xs text-red-500">{errors.agreed}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#0CC8A8] hover:bg-[#0ab394] active:bg-[#089e82]
                text-white font-semibold py-3.5 text-sm transition-colors duration-150
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Creating account…
                </span>
              ) : 'Create account'}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-3 gap-3">
              {/* Apple */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-gray-900 text-white py-2.5 transition-colors"
                aria-label="Sign in with Apple"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>

              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 py-2.5 transition-colors"
                aria-label="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              {/* Meta */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg bg-[#0866FF] hover:bg-[#0759e0] text-white py-2.5 transition-colors"
                aria-label="Sign in with Meta"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06 2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96 15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
