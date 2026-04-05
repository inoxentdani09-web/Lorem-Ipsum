import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import GoogleLoginButton from './GoogleLoginButton'

// Input field component
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
    showPassword
}) => {
    // Set appropriate autocomplete value
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
                    type={showToggle && showPassword ? 'text' : type}
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
                        {showPassword ? (
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

const LoginPage = () => {
    const navigate = useNavigate()

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
    }, [navigate])



    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Clear form on component mount
    useEffect(() => {
        setFormData({
            email: '',
            password: ''
        })
        setErrors({})
        setErrorMessage('')
    }, [])

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
        if (errorMessage) {
            setErrorMessage('')
        }
    }

    // Validation function
    const validateForm = () => {
        const newErrors = {}

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setErrorMessage('')

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            })

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('JSON parsing error:', jsonError);
                setErrorMessage('Server returned invalid response. Please try again.');
                return;
            }

            if (!response.ok) {
                setErrorMessage(data.error || 'Login failed')
                return
            }

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/')
        } catch (error) {
            console.error(error)
            setErrorMessage('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSuccess = (data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/')
    }

    const handleGoogleError = (message) => {
        setErrorMessage(message || 'Google sign-in failed. Please try again.')
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 via-purple-900 to-gray-900 flex items-center justify-center p-4 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            {/* Modal Overlay - Dark semi-transparent background */}
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-5xl">
                <div className="flex flex-col lg:flex-row items-stretch gap-0 bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                    {/* Image Section - Left Side */}
                    <div className="w-full lg:w-1/2 aspect-2/1 bg-gray-900">
                        <img
                            src="/images/login.jpeg"
                            alt="Login banner"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Form Section - Right Side */}
                    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Welcome back
                            </h1>
                            <p className="text-gray-400 text-sm">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        {/* Error message */}
                        {errorMessage && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium animate-fade-in">
                                {errorMessage}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                            {/* Email field */}
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                formData={formData}
                                handleInputChange={handleInputChange}
                                errors={errors}
                            />

                            {/* Password field */}
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

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-3 px-4 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Or sign in with</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        {/* OAuth buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <GoogleLoginButton
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                            />

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

                {/* Responsive styles */}
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

export default LoginPage
