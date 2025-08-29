import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSend, IoIosLogIn, IoIosPersonAdd } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { status, signUpError, signInError } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signIn({ email, password })).unwrap();
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signUp({ email, password, fullName })).unwrap();
      toast.success("Sign up successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      console.log("Success");
      navigate("/");
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  const handleGoogleAuth = () => {
    // Implement Google authentication logic here
    console.log("Google authentication clicked");
    // This would typically redirect to your backend Google auth endpoint
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className="grid md:grid-cols-2 bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Column - Enhanced */}
        <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#e76f00] to-[#cc5500] text-white text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-16 translate-y-16"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {isSignUp ? (
                <>
                  <span className="text-white font-light">Get Started</span>
                </>
              ) : (
                <>
                  <span className="text-white font-light">Welcome Back!</span>
                </>
              )}
            </h2>

            <div className="my-4 w-24 h-[0.15rem] bg-white mx-auto rounded-full"></div>

            <p className="text-base md:text-lg opacity-90 max-w-sm ">
              {isSignUp
                ? "Create an account to unlock exclusive features and personalized experiences."
                : "Sign in to track sales, manage products, and make smarter decisions."}
            </p>

            <div className="mt-10 flex items-center justify-center">
              <div className="flex space-x-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-2 h-2 bg-white rounded-full"
                  ></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Form) */}
        <div className="py-12 px-8 relative min-h-[550px] flex items-center">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="flex items-center mb-2">
                  <IoIosPersonAdd className="text-primary mr-2 text-2xl" />
                  <h3 className="text-3xl font-bold text-gray-700">
                    Create Account
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Fill in your details to get started
                </p>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />

                  {signUpError && (
                    <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                      {signUpError}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#e65e00] to-[#ff7a00] text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg transition-all"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Create Account <IoIosSend size={18} />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">
                    Or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
                >
                  <FcGoogle size={20} />
                  Sign up with Google
                </motion.button>

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-primary-dark font-medium hover:text-primary transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signin"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="flex items-center mb-2">
                  <IoIosLogIn className="text-primary mr-2 text-2xl" />
                  <h3 className="text-3xl font-bold text-gray-700">
                    Welcome Back
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">Sign in to your account</p>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm text-primary-dark hover:text-primary transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {signInError && (
                    <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                      {signInError}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#e65e00] to-[#ff7a00] text-white py-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mx-auto"></div>
                    ) : (
                      "Sign In"
                    )}
                  </motion.button>
                </form>

                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">
                    Or continue with
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all"
                >
                  <FcGoogle size={20} />
                  Sign in with Google
                </motion.button>

                <p className="mt-6 text-sm text-gray-600 text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-primary-dark font-medium hover:text-primary transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
