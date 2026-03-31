import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn
} from "lucide-react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
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


      if (res.data?.user?.role === "admin") {

        navigate("/admin/dashboard");

      } else if (!res.data?.user?.preferences?.length) {

        navigate("/categories");

      } else {

        navigate("/feed");

      }

    } catch (err) {

      setError(
        err.response?.data?.message || "Login failed"
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

          {/* <LogIn className="text-blue-600" size={28} /> */}

          <h2 className="text-3xl font-bold text-gray-800">

            Welcome Back

          </h2>

        </div>



        {/* ERROR */}

        {

          error && (

            <div className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-lg">

              {error}

            </div>

          )

        }



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
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              className="w-full border border-gray-300 pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />


            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >

              {

                showPassword

                  ? <EyeOff size={18} />

                  : <Eye size={18} />

              }

            </button>

          </div>

        </div>



        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg transition duration-300
  ${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >

          {
            loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )
          }

        </button>


        {/* FOOTER */}

        <p className="text-center text-sm text-gray-500 mt-4">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
          >
            Create an account
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;