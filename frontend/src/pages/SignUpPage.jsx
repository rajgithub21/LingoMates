import React, { useState } from 'react'
import {ShipWheelIcon} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp.js';

const SignUpPage = () => {
  const [signupData,setSignupData]=useState({
    fullName:"",
    email:"",
    password:"",
  });
//   const queryClient=useQueryClient();

//   const {mutate ,isPending ,error}=useMutation({
//     mutationFn :signup,
//     onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]}),
//   });
const {isPending,error,mutate}=useSignUp();
  const handleSignup=(e)=>{
    e.preventDefault();
	  mutate(signupData);
  };

  const handleDemoCredentials = () => {
    setSignupData({
      fullName: "Demo User",
      email: "demo@gmail.com",
      password: "123456",
    });
  };
  return (
    <>
      <div
        className="h-[90%] flex items-center justify-center p-4 sm:p-6 md:p-8"
        data-theme="nights"
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          {/* signup left side */}
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col ">
            {/* Logo */}
            <div className="mb-4 flex items-center justify-start gap-2">
              <ShipWheelIcon className="size-9 text-primary"></ShipWheelIcon>
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                LingoMates
              </span>
            </div>
            {/* error message if any */}
            {error && (
              <div className="alert alert-error mb-4 text-sm">
                <span>{error.response.data.message}</span>
              </div>
            )}

            <div className="w-full">
              <form onSubmit={handleSignup}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Create an Account</h2>
                    <p className="text-sm opacity-70">
                      Join LingoMates and start your language learning adventure
                    </p>
                  </div>
                  <div className="space-y-3">
                    {/* FULL NAME */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="input input-bordered w-full"
                        value={signupData.fullName}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    {/* EMAIL */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@gmail.com"
                        className="input input-bordered w-full"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    {/* PASSWORD */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="*********"
                        className="input input-bordered w-full"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs opacity-70 mt-1">
                        Password must be at least 6 characters long
                      </p>
                    </div>
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          required
                        />
                        <span className="text-xs leading-tight">
                          I agree to the{" "}
                          <span className="text-primary hover:underline">
                            terms of service
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline">
                            privacy policy
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button className="btn btn-primary w-full" type="submit">
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Loading...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDemoCredentials}
                    className="btn btn-outline w-full"
                  >
                    Use Demo Credentials
                  </button>
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Signup right side */}
          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
            <div className="max-w-md p-8">
              {/* Illustration */}
              <div className="relative aspect-square max-w-sm mx-auto">
                <img
                  src="/vc3.png"
                  alt="Language connection illustration"
                  className="w-full h-full"
                />
              </div>

              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-semibold">
                  Connect with language partners worldwide
                </h2>
                <p className="text-sm opacity-70">
                  Practice conversations, make friends, and improve your
                  language skills together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center h-[10%] text-3xl" data-theme="nights">
        Created and Developed by Raj Mishra
      </div>
    </>
  );
}

export default SignUpPage
