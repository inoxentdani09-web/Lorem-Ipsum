import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const InputField = ({
    label,
    name,
    type = 'text',
    placeholder,
    showToggle = false,
    onToggle = null,
    formData,
    handleInputChange,
    errors,
    showPassword,
    showConfirmPassword
}) => {
    let autoCompleteValue = "off"
    if (name === 'password' || name === 'confirmPassword') {
        autoCompleteValue = "new-password"
    }

    return (
        <div className="mb-3">
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1.5">
                {label}
            </label>

            <div className="relative">
                <input
                    type={showToggle && (name === 'password' ? showPassword : showConfirmPassword) ? 'text' : type}
                    id={name}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    autoComplete={autoCompleteValue}
                    className={`w-full px-4 py-2.5 text-sm bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${errors[name] ? 'border-red-500' : 'border-gray-600'
                        }`}
                />
                {showToggle && onToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        {(name === 'password' ? showPassword : showConfirmPassword) ? (
                            <AiOutlineEye size={18} />
                        ) : (
                            <AiOutlineEyeInvisible size={18} />
                        )}
                    </button>
                )}
            </div>
            {errors[name] && (
                <p className="mt-1 text-xs text-red-400">{errors[name]}</p>
            )}
        </div>
    )
}

const SignupPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    useEffect(() => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        })

    }, [])


    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'First name must be at least 2 characters'
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Last name must be at least 2 characters'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            newErrors.password = 'Password must contain lowercase letters'
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase letters'
        } else if (!/(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain numbers'
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms & Conditions'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))

            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                email: formData.email,
                signupDate: new Date().toISOString(),
            }

            localStorage.setItem('userData', JSON.stringify(userData))

            setSuccessMessage('Account created successfully!')

            setTimeout(() => {
                navigate('/Login')
            },)

        } catch (error) {
            console.error('Signup error:', error)
        } finally {
            setIsLoading(false)
        }
    }
    return (

        <div className="min-h-screen bg-linear-to-br from-gray-100 via-purple-900 to-gray-900 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72  bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="fixed inset-0  bg-black/30 backdrop-blur-sm pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className="flex flex-col lg:flex-row items-stretch gap-0 bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                    <div className="w-full lg:w-1/2 aspect-2/1 bg-gray-900">
                        <img
                            src="/images/signup pic.avif"
                            alt="Signup banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Create an account
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Already have an account?{' '}

                                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </div>

                        {successMessage && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium animate-fade-in">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <InputField
                                    label="First name"
                                    name="firstName"
                                    placeholder="First name"
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                                <InputField
                                    label="Last name"
                                    name="lastName"
                                    placeholder="Last name"
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    errors={errors}
                                />
                            </div>
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                            />

                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                showToggle={true}
                                onToggle={() => setShowPassword(!showPassword)}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                                showPassword={showPassword}
                            />

                            <InputField
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                showToggle={true}
                                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                                showConfirmPassword={showConfirmPassword}
                            />

                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleInputChange}
                                        formData={formData}
                                        errors={errors}

                                        className="mt-1 w-4 h-4 rounded bg-gray-700 border border-gray-600 checked:bg-purple-500 checked:border-purple-500 cursor-pointer accent-purple-500"
                                    />
                                    <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">
                                        I agree to the{' '}
                                       <Link to="/terms" className="text-purple-400 hover:text-purple-300 font-semibold">
                                            Terms & Conditions
                                       </Link>
                                    </span>
                                </label>
                                {errors.agreeToTerms && (
                                    <p className="mt-1 text-xs text-red-400 ml-7">{errors.agreeToTerms}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-3 px-4 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Creating account...
                                    </span>
                                ) : (
                                    'Create account'
                                )}
                            </button>

                        </form>

                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Or signup with</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
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
                                <span className="hidden sm:inline">Google</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M16.365 1.43c0 1.14-.41 2.23-1.09 3.02-.7.8-1.83 1.42-2.95 1.33-.14-1.11.44-2.29 1.14-3.06.77-.87 2.03-1.49 2.9-1.29zM20.5 17.12c-.8 1.84-1.77 3.67-3.32 3.69-1.53.03-2.02-.9-3.77-.9-1.76 0-2.3.87-3.75.93-1.5.06-2.64-1.5-3.45-3.33-1.66-3.84-.29-9.95 2.91-10.12 1.45-.07 2.82 1 3.77 1 1.04 0 2.99-1.23 5.05-1.05.86.03 3.28.35 4.83 2.63-.12.07-2.88 1.67-2.85 4.98.03 3.96 3.48 5.28 3.52 5.3-.03.09-.56 1.93-1.84 3.82z"
                                    />
                                </svg>
                                <span className="hidden sm:inline">Apple</span>
                            </button>
                        </div>
                    </div>
                </div>

                <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
            </div>
        </div>
    )
}
export default SignupPage
