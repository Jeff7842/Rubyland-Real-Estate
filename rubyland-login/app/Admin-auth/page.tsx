"use client";
import React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import '../../components/styles/admin-auth.css'
import '../../components/styles/main.css'
import { styled } from "styled-components";
import { useEffect } from "react";
import {initAdminAuth} from "../../components/admin-auth";


export default function Auth(){

useEffect(() => {
    initAdminAuth();
  }, [])

  return (
    <>
      <div className="admin-auth-body">

  <main className="admin-auth-wrapper">

    <div className="admin-auth-card">

      <div className="admin-auth-header">
        <Image src="https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/logo%20ONLY.png" alt="Rubyland Logo" loading="eager" width={100} height={100}/>
        <h1>Admin Portal</h1>
        <p>Authorized personnel only</p>
      </div>

      <form id="adminLoginForm" className="admin-auth-form">

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="admin@rubyland.co.ke"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type="password"
              name="password"
              id="adminPassword"
              className="form-control"
              placeholder="••••••••••"
              required
            />
            <button type="button" className="toggle-password" aria-label="Toggle password">
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary admin-login-btn">
          Secure Login
        </button>

        <div className="admin-auth-footer">
          <span>Rubyland Internal Systems</span>
        </div>

      </form>

    </div>

  </main>
</div>
<Script src='../../components/js/admin-auth.ts' strategy="afterInteractive"></Script>
    </>
  )
};

