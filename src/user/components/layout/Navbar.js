/**
 * NAVBAR COMPONENT
 * =================
 * Premium sticky navigation with mobile hamburger menu.
 * 
 * Navigation Structure:
 * - Logo (left)
 * - Home (shows ALL properties)
 * - Buy (filtered: sale only)
 * - Rent (filtered: rent only)
 * - Plots & Land (filtered: plot + land types)
 * - Agents
 * - Post Property
 * - Login / Register
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout, isAdmin, isAgent } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
    }, [location]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userDropdownOpen && !e.target.closest('.user-dropdown')) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [userDropdownOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getDashboardLink = () => {
        if (isAdmin) return '/admin';
        if (isAgent) return '/agent/dashboard';
        return '/dashboard';
    };

    // Check if current path matches
    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path) || location.search.includes(path.split('?')[1]?.split('=')[1] || '');
    };

    // Main navigation links - Agents link removed as per requirement
    const navLinks = [
        { name: 'Home', href: '/', description: 'All properties' },
        { name: 'Buy', href: '/buy', description: 'Properties for sale' },
        { name: 'Rent', href: '/rent', description: 'Properties for rent' },
        { name: 'Plots & Land', href: '/plots-land', description: 'Plots and land' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">

                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-800 hidden sm:block">PropFind</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(link.href)
                                            ? 'text-primary-600 bg-primary-50'
                                            : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Post Property - for agents */}
                            {isAgent && (
                                <Link
                                    to="/agent/add-property"
                                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Post Property
                                </Link>
                            )}
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {isAuthenticated ? (
                                <>
                                    {/* Messages */}
                                    <Link
                                        to="/chat"
                                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors relative"
                                        aria-label="Messages"
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </Link>

                                    {/* User Dropdown */}
                                    <div className="relative user-dropdown">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setUserDropdownOpen(!userDropdownOpen);
                                            }}
                                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                                                {user?.name}
                                            </span>
                                            <svg className={`w-4 h-4 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {userDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                                                    <p className="text-xs text-slate-500">{user?.email}</p>
                                                    <span className="inline-block mt-1 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full capitalize">
                                                        {user?.role}
                                                    </span>
                                                </div>
                                                <Link
                                                    to={getDashboardLink()}
                                                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-gray-50"
                                                >
                                                    <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                    Dashboard
                                                </Link>
                                                {isAgent && (
                                                    <Link
                                                        to="/agent/add-property"
                                                        className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-gray-50"
                                                    >
                                                        <svg className="w-4 h-4 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                        Post Property
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm hover:shadow"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Full-Screen Drawer */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-slate-800">PropFind</span>
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-gray-100"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={`flex items-center justify-between px-4 py-4 rounded-xl transition-colors ${isActive(link.href)
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'text-slate-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div>
                                            <span className="text-base font-medium">{link.name}</span>
                                            <p className="text-xs text-slate-500 mt-0.5">{link.description}</p>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}

                                {isAgent && (
                                    <Link
                                        to="/agent/add-property"
                                        className="flex items-center justify-between px-4 py-4 rounded-xl bg-primary-50 text-primary-600"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="text-base font-medium">Post Property</span>
                                                <p className="text-xs text-primary-500 mt-0.5">List your property</p>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>

                            {isAuthenticated && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <Link
                                        to="/chat"
                                        className="flex items-center px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-xl"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Messages
                                    </Link>
                                    <Link
                                        to={getDashboardLink()}
                                        className="flex items-center px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-xl"
                                    >
                                        <svg className="w-5 h-5 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100">
                            {isAuthenticated ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                                        <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        to="/login"
                                        className="block w-full px-4 py-3 text-center text-slate-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block w-full px-4 py-3 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-xl font-medium transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;