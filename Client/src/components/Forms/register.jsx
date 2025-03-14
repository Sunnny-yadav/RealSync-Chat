import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUserContext } from '../../context/auth.context';


function RegisterPage() {
    const [registrationData, setregistrationData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null,
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const {SetTokenInLocalStorage} = useUserContext()

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setregistrationData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData()

        for (const key in registrationData) {
            formData.append(key, registrationData[key])
        }
        const toastId = toast.loading("Registration under process")
        try {
            const response = await fetch("http://localhost:8000/api/v1/users/register",{
                method:"POST",
                body:formData
            });

            const data = await response.json()
         
            if(response.ok){
                SetTokenInLocalStorage(data?.data.AccessToken);
                toast.success("registration successfull",{id:toastId})
                navigate("/chat")
            }else{
                toast.error(data.message,{id:toastId})
                throw new Error("Error in response occured")
            }
        } catch (error) {
            console.log("Error in handelSubmit of registration: ",error)
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-black px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="bg-[#1A1A1D] p-6 sm:p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-md border border-green-500">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-green-400 mb-6 sm:mb-8 tracking-wide">
                    RealSync Chat
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-green-300 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={registrationData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-green-300 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={registrationData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-green-300 font-semibold mb-2">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={registrationData.password}
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

                    <div>
                        <label htmlFor="avatar" className="block text-green-300 font-semibold mb-2">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                            className="w-full p-2 sm:p-3 border border-green-500 rounded-lg bg-transparent text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-black font-bold py-2 sm:py-3 rounded-lg hover:bg-green-400 transition-all"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center text-green-400 mt-4 sm:mt-6">
                    Already have an account? <Link to="/login" className="text-green-500 underline">Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
