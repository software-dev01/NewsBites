import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    UserPlus
} from "lucide-react";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleRegister = async () => {

        try {

            setLoading(true);

            const res = await API.post("/auth/register", {
                name,
                email,
                password
            });

            localStorage.setItem(
                "user",
                JSON.stringify({
                    token: res.data?.token,
                    role: res.data?.user?.role,
                    name: res.data?.user?.name
                })
            );

            navigate("/categories");

        } catch (err) {

            setError(
                err.response?.data?.message || "Signup failed"
            );

        } finally {

            setLoading(false);

        }

    };



    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                {/* HEADER */}

                <div className="flex items-center justify-center gap-2 mb-6">

                    {/* <UserPlus className="text-blue-600" size={28} /> */}

                    <h2 className="text-3xl font-bold text-gray-800">

                        Create Account

                    </h2>

                </div>



                {/* ERROR MESSAGE */}

                {

                    error && (

                        <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg">

                            {error}

                        </div>

                    )

                }


                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        if (!name || !email || !password) {
                            setError("All fields are required");
                            return;
                        }

                        handleRegister();
                    }}
                >

                    {/* NAME */}

                    <div className="mb-4">

                        <label className="block text-gray-600 mb-2">

                            Full Name

                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>

                    </div>



                    {/* EMAIL */}

                    <div className="mb-4">

                        <label className="block text-gray-600 mb-2">

                            Email Address

                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                    </div>



                    {/* PASSWORD */}

                    <div className="mb-6">

                        <label className="block text-gray-600 mb-2">

                            Password

                        </label>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="w-full border border-gray-300 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >

                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}

                            </button>

                        </div>

                    </div>



                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >

                        <UserPlus size={18} />

                        {loading ? "Creating account..." : "Create Account"}

                    </button>

                </form>


                {/* FOOTER */}

                <p className="text-center text-sm text-gray-500 mt-4">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
                    >
                        Sign in
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Signup;