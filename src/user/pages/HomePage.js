/**
 * HOME PAGE
 * ==========
 * Premium landing page showing ALL properties.
 * Features:
 * - Hero search
 * - Category tabs (All, Buy, Rent, Plots, Land)
 * - Featured properties
 * - Sponsored ads (UX safe)
 * - City browsing
 * - Trust indicators
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/common/PropertyCard';
import AdBanner from '../components/ads/AdBanner';
import VideoAdBanner from '../components/ads/VideoAdBanner';

const HomePage = () => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useState({
        city: '',
        listingType: 'sale',
        propertyType: '',
        maxPrice: '',
    });

    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const [featuredRes, allRes] = await Promise.all([
                    propertyAPI.getFeatured({ limit: 6 }),
                    propertyAPI.getAll({ limit: 12 }),
                ]);
                setFeaturedProperties(featuredRes.data.data.properties);
                setAllProperties(allRes.data.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchParams.city) params.set('city', searchParams.city);
        if (searchParams.listingType) params.set('listingType', searchParams.listingType);
        if (searchParams.propertyType) params.set('propertyType', searchParams.propertyType);
        if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice);

        navigate(`/properties?${params.toString()}`);
    };

    // Filter properties based on active tab
    const getFilteredProperties = () => {
        switch (activeTab) {
            case 'buy':
                return allProperties.filter(p => p.listingType === 'sale' && !['plot', 'land'].includes(p.propertyType));
            case 'rent':
                return allProperties.filter(p => p.listingType === 'rent');
            case 'plots':
                return allProperties.filter(p => p.propertyType === 'plot');
            case 'land':
                return allProperties.filter(p => p.propertyType === 'land');
            default:
                return allProperties;
        }
    };

    const filteredProperties = getFilteredProperties();

    const popularCities = [
        { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80', count: '2,500+' },
        { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80', count: '1,800+' },
        { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80', count: '2,100+' },
        { name: 'Pune', image: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=400&q=80', count: '1,200+' },
        { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&q=80', count: '900+' },
        { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', count: '750+' },
    ];

    const stats = [
        { value: '10K+', label: 'Properties Listed' },
        { value: '5K+', label: 'Happy Customers' },
        { value: '500+', label: 'Verified Agents' },
        { value: '50+', label: 'Cities Covered' },
    ];

    const categoryTabs = [
        { id: 'all', label: 'All', icon: '🏠' },
        { id: 'buy', label: 'Buy', icon: '🔑' },
        { id: 'rent', label: 'Rent', icon: '📋' },
        { id: 'plots', label: 'Plots', icon: '📐' },
        { id: 'land', label: 'Land', icon: '🌳' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 pt-24 pb-32 lg:pt-32 lg:pb-40">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 lg:mb-14">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6">
                            Find Your Perfect
                            <span className="text-primary-400"> Home</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
                            Discover thousands of properties across India. Buy, rent, or invest with trusted agents.
                        </p>
                    </div>

                    {/* Search Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
                            {/* Buy/Rent Toggle */}
                            <div className="flex gap-2 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({ ...searchParams, listingType: 'sale' })}
                                    className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold text-sm transition-all ${searchParams.listingType === 'sale'
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                            : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Buy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({ ...searchParams, listingType: 'rent' })}
                                    className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold text-sm transition-all ${searchParams.listingType === 'rent'
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                            : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                                        }`}
                                >
                                    Rent
                                </button>
                            </div>

                            {/* Search Form */}
                            <form onSubmit={handleSearch}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="relative">
                                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Location</label>
                                        <div className="relative">
                                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="Enter city..."
                                                value={searchParams.city}
                                                onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Property Type</label>
                                        <select
                                            value={searchParams.propertyType}
                                            onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">All Types</option>
                                            <option value="flat">Flat / Apartment</option>
                                            <option value="house">House</option>
                                            <option value="villa">Villa</option>
                                            <option value="plot">Plot</option>
                                            <option value="land">Land</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Budget</label>
                                        <select
                                            value={searchParams.maxPrice}
                                            onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Any Budget</option>
                                            <option value="2500000">Up to ₹25 Lac</option>
                                            <option value="5000000">Up to ₹50 Lac</option>
                                            <option value="10000000">Up to ₹1 Cr</option>
                                            <option value="25000000">Up to ₹2.5 Cr</option>
                                            <option value="50000000">Up to ₹5 Cr</option>
                                        </select>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:shadow-primary-600/40 transition-all flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-16 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-primary-600 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsored Banner - Below Hero */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AdBanner position="home-hero" />
                </div>
            </section>

            {/* All Properties with Category Tabs */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                            Browse Properties
                        </h2>
                        <p className="text-slate-500">
                            Explore all available properties or filter by category
                        </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categoryTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${activeTab === tab.id
                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                                        : 'bg-white text-slate-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card">
                                    <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                                        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {filteredProperties.slice(0, 9).map((property) => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <button
                                    onClick={() => {
                                        if (activeTab === 'buy') navigate('/buy');
                                        else if (activeTab === 'rent') navigate('/rent');
                                        else if (activeTab === 'plots' || activeTab === 'land') navigate('/plots-land');
                                        else navigate('/properties');
                                    }}
                                    className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                                >
                                    View All Properties
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-slate-500">No properties found in this category</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Popular Cities */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 lg:mb-14">
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                            Explore Popular Cities
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Find properties in India's most sought-after locations
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        {popularCities.map((city) => (
                            <button
                                key={city.name}
                                onClick={() => navigate(`/properties?city=${city.name}`)}
                                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-left">
                                    <h3 className="text-white font-semibold text-lg">{city.name}</h3>
                                    <p className="text-white/80 text-sm">{city.count} properties</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsored Banner - Middle */}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AdBanner position="home-mid" />
                </div>
            </section>

            {/* Video Ad Section */}
            <section className="py-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <VideoAdBanner position="home-mid" />
                </div>
            </section>

            {/* Featured Properties */}
            {featuredProperties.length > 0 && (
                <section className="py-16 lg:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 lg:mb-14">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                                    Featured Properties
                                </h2>
                                <p className="text-slate-500">Hand-picked properties for you</p>
                            </div>
                            <button
                                onClick={() => navigate('/properties?featured=true')}
                                className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 transition-colors"
                            >
                                View All
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 lg:mb-14">
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                            Why Choose PropFind?
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            We make property search simple, secure, and stress-free
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: 'Verified Listings',
                                description: 'All properties are verified by our team for authenticity',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                title: 'Secure Contact',
                                description: 'Your privacy is protected. No spam calls guaranteed',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                ),
                                title: 'Direct Chat',
                                description: 'Chat with agents directly without sharing your number',
                            },
                            {
                                icon: (
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: 'Fast & Easy',
                                description: 'Find your dream property in minutes, not days',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 lg:p-8 shadow-card hover:shadow-card-hover transition-shadow text-center"
                            >
                                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                                <p className="text-slate-500 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-primary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        Ready to Find Your Dream Home?
                    </h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of happy customers who found their perfect property with PropFind
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/properties')}
                            className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
                        >
                            Browse Properties
                        </button>
                        <button
                            onClick={() => navigate('/register?role=agent')}
                            className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-colors border border-primary-500"
                        >
                            List Your Property
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;