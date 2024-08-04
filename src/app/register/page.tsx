'use client';
import { RegisterForm } from '@/components/RegisterForm';
import React from 'react'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Register Page</h1>
      <RegisterForm></RegisterForm>

    </main>
  )
}