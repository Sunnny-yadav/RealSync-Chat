import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex h-screen items-center justify-center bg-black px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="bg-[#1A1A1D] p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-green-500">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-400 mb-6 sm:mb-8 tracking-wide">
                    RealSync Chat
                </h1>

                <form className="flex flex-col space-y-4 sm:space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-green-300 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-green-300 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-green-300 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-[54%] transform -translate-y-1/2 text-green-400"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Avatar Field */}
                    <div>
                        <label htmlFor="avatar" className="block text-green-300 font-semibold mb-2">
                            Avatar
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-black font-bold py-2 sm:py-3 rounded-lg hover:bg-green-400 transition-all"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center text-green-400 mt-4 sm:mt-6">
                    Already have an account? <Link to="/login" className="text-green-500 underline">Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
