// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SignupInput } from '@abhimanyu-2903/medium-common';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

// ADD THIS
import { Turnstile } from "@marsidev/react-turnstile";

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    username: '',
    password: ''
  });

  const [token, setToken] = useState("");

  async function sendRequest() {
    if (postInputs.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!token) {
      alert("Please verify you are human.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        {
          ...postInputs,
          turnstileToken: token 
        }
      );

      const jwt = response.data.token;
      const userId = response.data.user.id;
      const name = response.data.user.name;

      localStorage.setItem('token', jwt);
      localStorage.setItem('userId', userId);
      localStorage.setItem('name', name);

      navigate('/blog');
    } catch (e: any) {
      if (e.response) {
        alert(e.response.data?.message || 'Server error occurred');
      } else if (e.request) {
        alert('Network error. Please check your connection.');
      } else {
        alert('Unexpected error occurred.');
      }
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">
            {type === 'signup' ? 'Create an Account' : 'Welcome Back'}
          </div>
          <div className="text-slate-400 mb-4">
            {type === 'signup'
              ? 'Already have an account?'
              : "Don't have an account?"}
            <Link
              to={type === 'signup' ? '/signin' : '/signup'}
              className="ml-2 text-blue-500"
            >
              {type === 'signup' ? 'Login' : 'Register'}
            </Link>
          </div>

          {type === 'signup' && (
            <LabelledInput
              label="Name"
              placeholder="John Doe"
              value={postInputs.name}
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}

          <LabelledInput
            label="Username"
            placeholder="example@gmail.com"
            type="email"
            value={postInputs.username}
            onChange={(e) =>
              setPostInputs({ ...postInputs, username: e.target.value })
            }
          />

          <LabelledInput
            label="Password"
            placeholder="********"
            type="password"
            value={postInputs.password}
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
            minLengthWarning="Password must be at least 6 characters long"
          />

          {}
          <div className="my-4">
            <Turnstile
              siteKey="0x4AAAAAACBXtSjUVSPhojZE" 
              onSuccess={(token) => setToken(token)}
            />
          </div>

          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            {type === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>

        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  value?: string;
  minLengthWarning?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = 'text',
  className,
  value = '',
  minLengthWarning
}: LabelledInputType) {
  return (
    <div className={`mb-4 ${className || ''}`}>
      <label className="block mb-2 text-sm font-medium text-green-900">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
      {minLengthWarning && value.length > 0 && value.length < 6 && (
        <p className="text-red-500 text-sm mt-1">{minLengthWarning}</p>
      )}
    </div>
  );
}
