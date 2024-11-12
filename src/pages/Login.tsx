import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle, checkRedirectResult } from '../lib/firebase';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirect = async () => {
      const result = await checkRedirectResult();
      if (result.user) {
        navigate('/dashboard');
      } else if (result.error) {
        setError(result.error);
      }
    };
    checkRedirect();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = isLogin
        ? await loginWithEmail(email, password)
        : await registerWithEmail(email, password);

      if (result.error) {
        setError(result.error);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      if (result.error) {
        setError(result.error);
      } else if (result.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h1 className="text-3xl font-bold text-center mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Spell Jam'}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {isLogin ? 'Continue your learning journey' : 'Start your learning adventure'}
            </p>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-3 px-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-6 disabled:opacity-50"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-500"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isLogin ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-600 hover:underline font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;