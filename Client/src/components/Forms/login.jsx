import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    // State for email and password
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:8000/api/v1/users/login',
                {
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:JSON.stringify(formData)
                }
            );

            const responseData = await response.json()
            console.log(responseData)
            if(response.ok){
                console.log("login done")
            }else{
                throw new Error("error in getting response")
            }
        } catch (error) {
            console.log("Error in login function",error)
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-black px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="bg-[#1A1A1D] p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-green-500">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-400 mb-6 sm:mb-8 tracking-wide">
                    RealSync Chat
                </h1>

                <form className="flex flex-col space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-green-300 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
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

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-black font-bold py-2 sm:py-3 rounded-lg hover:bg-green-400 transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <div className="text-center text-green-400 mt-4 sm:mt-6">
                    Don't have an account? <Link to="/register" className="text-green-500 underline">Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
