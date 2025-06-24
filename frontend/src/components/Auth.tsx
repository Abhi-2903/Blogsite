// @ts-ignore
import { SignupInput } from '@abhimanyu-2903/medium-common';
import axios from 'axios';
// @ts-ignore
import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    username: '',
    password: ''
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const jwt = response.data.token;
      const userId = response.data.user.id
      localStorage.setItem('token', jwt);
      localStorage.setItem('userId', userId);
      navigate('/blog');
    } catch (e: any) {
      alert(e.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className='h-screen flex justify-center flex-col'>
      <div className='flex justify-center'>
        <div>
          <div className='text-3xl font-extrabold'>
            {type === 'signup' ? 'Create an Account' : 'Welcome Back'}
          </div>
          <div className='text-slate-400'>
            {type === 'signup'
              ? 'Already have an account?'
              : "Don't have an account?"}
            <Link
              to={type === 'signup' ? '/signin' : '/signup'}
              className='ml-2 text-blue-500'
            >
              {type === 'signup' ? 'Login' : 'Register'}
            </Link>
          </div>

          {type === 'signup' && (
            <LabelledInput
              label='Name'
              placeholder='Abhimanyu Chachan'
              onChange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}

          <LabelledInput
            label='Username'
            placeholder='abhimanyu_2903'
            onChange={(e) =>
              setPostInputs({ ...postInputs, username: e.target.value })
            }
          />

          <LabelledInput
            label='Password'
            placeholder='********'
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          <button
            type='button'
            onClick={sendRequest}
            className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4'
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
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return (
    <div className='mb-4'>
      <label className='block mb-2 text-sm font-medium text-green-900'>
        {label}
      </label>
      <input
        onChange={onChange}
        type='text'
        className='bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        required
      />
    </div>
  );
}
