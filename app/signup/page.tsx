'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up attempted with:', { fullname, email, password, confirmPassword });
  };

  return (
    <div className="auth-container">
      <header className="dost-header">
        <div className="logo-section">
          <div className="logo-circle">
            <Image src="/Logo1.png" alt="DOST Logo" width={48} height={48} />
          </div>
          <div className="header-text">
            <div className="header-subtitle">Provincial Science and Technology Office in Misamis Oriental</div>
            <div className="header-title">Department of Science and Technology</div>
          </div>
        </div>
      </header>

      <div className="background-blur">
        <div className="blur-circle blur-blue-1"></div>
        <div className="blur-circle blur-yellow"></div>
        <div className="blur-circle blur-blue-2"></div>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">
          Have an account? <Link href="/" className="auth-link">Click here</Link>
        </p>

        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
