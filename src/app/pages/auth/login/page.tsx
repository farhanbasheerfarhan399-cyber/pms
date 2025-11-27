// src/app/pages/auth/login/page.tsx
'use client';
import LoginForm from "../LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-50">
      <LoginForm />
    </div>
  );
}