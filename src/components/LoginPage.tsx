import React, { useState } from 'react';
import { Shield, User, Baby, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'parent' | 'child'>('parent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    const success = await login(email, password, activeRole);
    if (!success) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex items-center justify-between gap-12">
        {/* Logo Section - Left Side */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-8 rounded-3xl shadow-2xl inline-block mb-8">
            <Shield className="h-24 w-24 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">SafeYatra</h1>
          <p className="text-2xl text-blue-100 font-medium mb-6">AI Child Safety Platform</p>
          <p className="text-lg text-blue-200 max-w-md">
            Empowering parents and children with intelligent safety solutions for peace of mind.
          </p>
        </div>

        {/* Login Form - Right Side */}
        <div className="flex-1 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200 w-full max-w-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
              <p className="text-base text-gray-600">Sign in or create your account</p>
            </div>

            {/* Role Selection */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveRole('parent')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all font-semibold text-sm ${
                  activeRole === 'parent'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Parent</span>
              </button>
              <button
                onClick={() => setActiveRole('child')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all font-semibold text-sm ${
                  activeRole === 'child'
                    ? 'bg-white text-orange-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Baby className="h-5 w-5" />
                <span>Child</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {activeRole === 'parent' ? 'Email Address' : 'Username'}
                </label>
                <input
                  type={activeRole === 'parent' ? 'email' : 'text'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder={activeRole === 'parent' ? 'your@email.com' : 'Choose a username'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-12"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-base transition-all transform hover:scale-105 shadow-md ${
                  activeRole === 'parent'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing In...' : `Continue as ${activeRole === 'parent' ? 'Parent' : 'Child'}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;