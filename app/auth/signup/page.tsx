"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Alert, Card, CardBody } from "@/app/components";
import toast from "react-hot-toast";
import { createUser } from "@/lib/utils/api";
import Link from "next/link";


export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
    department: "",
  });
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
//     if(formData.role.toLowerCase()==="employee" || formData.role.toLowerCase()==="client" && UserStorage.load()?.role !=="admin"){
// //toast.error("Only admin can create employees or clients!", { style: { background: "red", color: "white" } });
//    setError(
//         "Only admin can create employees or clients!"
//       );
//     }

    if (!formData.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

  

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
       
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success("User creation successful! Please log in.", { style: { background: "green", color: "white" } });
          if (formData.role.toLowerCase() === "admin") router.push("/auth/login");
        } else {
          toast.error(data.message, { style: { background: "red", color: "white" } });
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
      <div className="w-full max-w-md mx-4 sm:mx-6">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-2xl font-bold text-blue-600">HT</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Health Tracker</h1>
          <p className="text-blue-100 text-lg">Project Management System</p>
        </div>

        <Card className="shadow-2xl border-0 rounded-2xl">
          <CardBody className="px-8 py-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Create Account
            </h2>
            <p className="text-center text-gray-600 mb-8">Join our platform to get started</p>

            {error && (
              <div className="mb-6">
                <Alert type="error" message={error} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                )}
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* <div>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    { value: "employee", label: "Employee" },
                    { value: "client", label: "Client" },
                    { value: "admin", label: "Admin" },
                  ]}
                />
              </div> */}

    

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full mt-2"
                size="lg"
              >
                Create Admin
              </Button>
            </form>

               <div className="mt-8 text-center">
              <p className="text-sm text-gray-700">
                Already have an admin account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  Login
                </Link>
              </p>
            </div>

           {/* {UserStorage.load()?.role==="admin" && (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-700">
                  Go back to admin panel
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 underline"
                  >
                    Admin Panel
                  </Link>
                </p>
              </div>
            )} */}
          </CardBody>
        </Card>

        <p className="text-center text-blue-100 text-xs mt-8 opacity-75">
          © 2025 Health Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
}
