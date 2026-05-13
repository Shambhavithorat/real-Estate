/**
 * FOOTER COMPONENT
 * =================
 * Premium footer with links, contact info, and social icons.
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'About Us', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Contact', href: '#' },
            { name: 'Blog', href: '#' },
        ],
        properties: [
            { name: 'Buy Property', href: '/buy' },
            { name: 'Rent Property', href: '/rent' },
            { name: 'Plots & Land', href: '/plots-land' },
            { name: 'Find Agents', href: '/agents' },
        ],
        cities: [
            { name: 'Mumbai', href: '/properties?city=Mumbai' },
            { name: 'Bangalore', href: '/properties?city=Bangalore' },
            { name: 'Delhi', href: '/properties?city=Delhi' },
            { name: 'Pune', href: '/properties?city=Pune' },
        ],
    };

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">PropFind</span>
                        </Link>
                        <p className="text-sm text-slate-400 mb-6 max-w-xs">
                            Find your perfect property with trusted agents. Safe, secure, and hassle-free.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 bg-slate-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                                    aria-label={social}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Properties Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Properties
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.properties.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cities Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Popular Cities
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.cities.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@propfind.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>1800-123-4567</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-sm text-slate-500">
                            © {currentYear} PropFind. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
