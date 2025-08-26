import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosSend } from "react-icons/io";
export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Column */}
        <div className="flex flex-col items-center justify-center p-10 bg-primary text-white text-center">
          <h2 className="text-4xl md:text-5xl font-normal my-3 text-white">
            {isSignUp ? (
              <p>Create Account</p>
            ) : (
              <>
                Welcome{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-white">
                  Back
                </span>
              </>
            )}
          </h2>

          <p className="text-base md:text-lg opacity-90 max-w-sm leading-relaxed">
            {isSignUp
              ? "Join us today and start managing your shopping experience with ease."
              : "Sign in to continue exploring your dashboard and shopping journey."}
          </p>
        </div>

        {/* Right Column (Form) */}
        <div className="py-12 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 p-6"
              >
                <h3 className="text-3xl font-normal mb-6 text-primary ">
                  Sign Up
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border px-4 py-3 focus:outline-none   rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-4 py-3 focus:outline-none   rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border px-4 py-3 focus:outline-none   rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-full btn mt-2 flex items-center justify-center gap-2">
                    Create Account <IoIosSend size={22} />
                  </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-primary font-medium"
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
                className="absolute inset-0 p-6"
              >
                <h3 className="text-3xl font-normal mb-6 text-primary">
                  Sign In
                </h3>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full  border px-4 py-3 focus:outline-none   rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full  border px-4 py-3 focus:outline-none   rounded-lg focus:ring-2 focus:ring-primary"
                  />
                  <button className="w-full btn">Sign In</button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-primary font-medium "
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
