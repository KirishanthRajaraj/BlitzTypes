'use client';
import { LoginForm } from '@/components/LoginForm';
import React from 'react'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Login Page</h1>
      <LoginForm></LoginForm>

    </main>
  )
}