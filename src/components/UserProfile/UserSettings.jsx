import { useContext, useState } from 'react';

import { UserContext } from '../../context/user.context';
import { ErrorContext } from '../../context/error.context';
import AuthError from '../Errors/AuthError';
import StrengthPW from '../Errors/StrengthPW';
import Divider from '../LandingPage/Dividers';

function UserSettings({ handleEdit }) {
  const { user } = useContext(UserContext);
  const { errors, setErrors } = useContext(ErrorContext);
  const [password, setPassword] = useState({
    value: '',
    strength: 0,
    text: 'week',
    color: 'bg-gray-100',
    colorText: 'text-gray-800',
  });

  const handlePassword = (e) => {
    const newState = { ...password };
    newState.value = e.target.value;
    newState.strength = evaluateStrength(newState.value);
    if (newState.strength === 0) {
      newState.text = 'week';
      newState.color = 'bg-gray-100';
      newState.colorText = 'text-gray-800';
    }
    if (newState.strength === 1) {
      newState.text = 'low';
      newState.color = 'bg-red-100';
      newState.colorText = 'text-red-800';
    }
    if (newState.strength === 2) {
      newState.text = 'medium';
      newState.color = 'bg-pink-100';
      newState.colorText = 'text-pink-800';
    }
    if (newState.strength === 3) {
      newState.text = 'close';
      newState.color = 'bg-purple-100';
      newState.colorText = 'text-purple-800';
    }
    if (newState.strength === 4) {
      newState.text = 'almost';
      newState.color = 'bg-blue-100';
      newState.colorText = 'text-blue-800';
    }
    if (newState.strength === 5) {
      newState.text = 'passed';
      newState.color = 'bg-green-100';
      newState.colorText = 'text-green-800';
    }
    setPassword(newState);
  };

  const evaluateStrength = (aValue) => {
    let passwordCheck = 0;
    // has at least 8 characters
    if (aValue.length >= 8) {
      passwordCheck++;
    }
    // has at least uppercase one letter
    if (/[a-z]/.test(aValue)) {
      passwordCheck++;
    }
    // has at least uppercase one letter
    if (/[A-Z]/.test(aValue)) {
      passwordCheck++;
    }
    // has at least one number
    if (/[\d]/.test(aValue)) {
      passwordCheck++;
    }
    // has at least one special character
    if (/[!@#$%/^&*]/.test(aValue)) {
      passwordCheck++;
    }
    return passwordCheck;
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* IMG HERE */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Edit Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleEdit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={user.username}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors && errors.username && (
                  <AuthError errMessage={errors.username} />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors && errors.email && (
                  <AuthError errMessage={errors.email} />
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <StrengthPW check={password} />
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handlePassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors && errors.password && (
                  <AuthError errMessage={errors.password} />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm new Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <Divider />

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors && errors.currentPassword && (
                  <AuthError errMessage={errors.currentPassword} />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setErrors(null)}
              >
                Confirm Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
