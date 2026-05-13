/**
 * PROPERTY DETAIL PAGE
 * =====================
 * Premium property detail with unified media gallery (images + video),
 * property info, and agent-safe contact system.
 * 
 * Features:
 * - Unified Media Gallery (Images + Video)
 * - Property type badge (Flat/House/Plot/Land)
 * - Buy/Rent badge
 * - Agent info (NO phone number)
 * - CTAs: Interested, Chat with Agent, Request Call
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyAPI, leadAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import MediaGallery from '../components/common/MediaGallery';
import ShareButton from '../components/common/ShareButton';
import ServiceAdCard from '../components/ads/ServiceAdCard';
import AdBanner from '../components/ads/AdBanner';

const PropertyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, isBuyer, user } = useAuth();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showInterestModal, setShowInterestModal] = useState(false);
    const [interestMessage, setInterestMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await propertyAPI.getById(id);
                setProperty(response.data.data.property);
            } catch (err) {
                setError('Property not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const formatPrice = (price) => {
        if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
        if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lac`;
        return `₹${price?.toLocaleString('en-IN')}`;
    };

    const getPropertyTypeLabel = (type) => {
        const labels = {
            flat: 'Flat',
            apartment: 'Apartment',
            house: 'House',
            villa: 'Villa',
            plot: 'Plot',
            land: 'Land',
        };
        return labels[type] || type?.charAt(0).toUpperCase() + type?.slice(1);
    };

    const isPlotOrLand = ['plot', 'land'].includes(property?.propertyType);

    const handleInterest = async (type) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/properties/${id}` } });
            return;
        }

        if (!isBuyer) {
            setError('Only buyers can express interest');
            return;
        }

        setSubmitting(true);
        try {
            await leadAPI.create({
                propertyId: id,
                inquiryType: type,
                message: interestMessage,
            });
            setSuccessMessage('Your interest has been registered! The agent will contact you soon.');
            setShowInterestModal(false);
            setInterestMessage('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit interest');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChat = () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/properties/${id}` } });
            return;
        }
        navigate(`/chat/${id}/${property.listedBy._id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (error && !property) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">{error}</h2>
                    <button
                        onClick={() => navigate('/properties')}
                        className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        Browse Properties
                    </button>
                </div>
            </div>
        );
    }

    const displayPrice = property?.listingType === 'rent'
        ? property?.rentAmount || property?.price
        : property?.price;

    const amenityIcons = {
        'parking': '🚗', 'lift': '🛗', 'security': '🔒', 'gym': '💪',
        'swimming-pool': '🏊', 'garden': '🌳', 'power-backup': '⚡',
        'water-supply': '💧', 'gas-pipeline': '🔥', 'club-house': '🏠',
        'children-play-area': '🎠', 'wifi': '📶', 'ac': '❄️'
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16 lg:pt-20 pb-24 lg:pb-8">
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="fixed top-20 left-4 right-4 z-50 max-w-lg mx-auto">
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">{successMessage}</p>
                        <button onClick={() => setSuccessMessage('')} className="ml-auto">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Unified Media Gallery */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-card p-4">
                            {/* Category Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {property?.isFeatured && (
                                    <span className="px-3 py-1.5 bg-amber-500 text-white text-sm font-semibold rounded-full">
                                        Featured
                                    </span>
                                )}
                                <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${property?.listingType === 'sale'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-emerald-500 text-white'
                                    }`}>
                                    {property?.listingType === 'sale' ? 'Buy' : 'Rent'}
                                </span>
                                <span className={`px-3 py-1.5 text-sm font-semibold rounded-full ${isPlotOrLand
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-slate-700 text-white'
                                    }`}>
                                    {getPropertyTypeLabel(property?.propertyType)}
                                </span>
                            </div>

                            <MediaGallery
                                images={property?.images || []}
                                video={property?.video}
                                title={property?.title}
                            />
                        </div>

                        {/* Property Info */}
                        <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-slate-800 mb-2">
                                        {property?.title}
                                    </h1>
                                    <div className="flex items-center text-slate-500">
                                        <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {property?.location?.address}, {property?.location?.city}
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="text-right">
                                        <div className="text-2xl lg:text-3xl font-bold text-primary-600">
                                            {formatPrice(displayPrice)}
                                        </div>
                                        {property?.listingType === 'rent' && (
                                            <span className="text-slate-500">per month</span>
                                        )}
                                    </div>
                                    {property && <ShareButton property={property} variant="icon" />}
                                </div>
                            </div>

                            {/* Specs Grid - Different for Plot/Land vs Flat/House */}
                            {isPlotOrLand ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-2xl mb-1">📐</div>
                                        <div className="text-lg font-semibold text-slate-800">{property?.specifications?.area} sq.ft</div>
                                        <div className="text-sm text-slate-500">Total Area</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <div className="text-2xl mb-1">🧭</div>
                                        <div className="text-lg font-semibold text-slate-800 capitalize">{property?.specifications?.facing || 'N/A'}</div>
                                        <div className="text-sm text-slate-500">Facing</div>
                                    </div>
                                    <div className="bg-orange-50 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                                        <div className="text-2xl mb-1">🔑</div>
                                        <div className="text-lg font-semibold text-orange-600">Buy Only</div>
                                        <div className="text-sm text-orange-500">No Rent Available</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-100">
                                    {[
                                        { label: 'Bedrooms', value: property?.specifications?.bedrooms, icon: '🛏️' },
                                        { label: 'Bathrooms', value: property?.specifications?.bathrooms, icon: '🚿' },
                                        { label: 'Area', value: `${property?.specifications?.area} sq.ft`, icon: '📐' },
                                        { label: 'Floor', value: property?.specifications?.floor || 'Ground', icon: '🏢' },
                                    ].map((spec, index) => (
                                        <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                                            <div className="text-2xl mb-1">{spec.icon}</div>
                                            <div className="text-lg font-semibold text-slate-800">{spec.value}</div>
                                            <div className="text-sm text-slate-500">{spec.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-slate-800 mb-3">Description</h2>
                                <p className="text-slate-600 leading-relaxed">{property?.description}</p>
                            </div>

                            {/* Details */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4">Property Details</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {[
                                        { label: 'Property Type', value: getPropertyTypeLabel(property?.propertyType) },
                                        { label: 'Listing Type', value: property?.listingType === 'sale' ? 'For Sale' : 'For Rent' },
                                        { label: 'Facing', value: property?.specifications?.facing || 'N/A' },
                                        ...(!isPlotOrLand ? [
                                            { label: 'Furnishing', value: property?.specifications?.furnishing?.replace('-', ' ') || 'N/A' },
                                            { label: 'Age', value: `${property?.specifications?.age || 0} years` },
                                            { label: 'Balconies', value: property?.specifications?.balconies || 0 },
                                        ] : []),
                                    ].map((detail, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                                            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{detail.label}</div>
                                            <div className="font-medium text-slate-800 capitalize">{detail.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities - Only for Flat/House */}
                            {!isPlotOrLand && property?.amenities?.length > 0 && (
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Amenities</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {property.amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-slate-700"
                                            >
                                                <span>{amenityIcons[amenity] || '✓'}</span>
                                                <span className="capitalize">{amenity.replace('-', ' ')}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <div className="bg-white rounded-2xl shadow-card p-6 sticky top-28">
                            {/* Agent Info - NO PHONE NUMBER */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Listed By</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold">
                                        {property?.listedBy?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">{property?.listedBy?.name}</h4>
                                        {property?.listedBy?.agentInfo?.agency && (
                                            <p className="text-sm text-slate-500">{property.listedBy.agentInfo.agency}</p>
                                        )}
                                        {property?.listedBy?.agentInfo?.isVerified && (
                                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-1">
                                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Verified Agent
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Notice */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                                <div className="flex gap-3">
                                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-sm text-amber-800">
                                        Contact details are protected. Use the buttons below to connect securely through our platform.
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons - Agent Safe Contact System */}
                            {user?._id !== property?.listedBy?._id && (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowInterestModal(true)}
                                        className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-600/30"
                                    >
                                        I'm Interested
                                    </button>
                                    <button
                                        onClick={handleChat}
                                        className="w-full py-3.5 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                        Chat with Agent
                                    </button>
                                    <button
                                        onClick={() => handleInterest('request-call')}
                                        disabled={submitting}
                                        className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        Request Callback
                                    </button>
                                </div>
                            )}

                            {/* Service Ads */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <ServiceAdCard position="detail-sidebar" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Ad Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <AdBanner position="detail-bottom" />
            </div>

            {/* Mobile Sticky CTA */}
            {user?._id !== property?.listedBy?._id && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowInterestModal(true)}
                            className="flex-1 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            I'm Interested
                        </button>
                        <button
                            onClick={handleChat}
                            className="px-4 py-3.5 bg-white border-2 border-primary-600 text-primary-600 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleInterest('request-call')}
                            className="px-4 py-3.5 bg-slate-100 text-slate-700 rounded-xl transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Interest Modal */}
            {showInterestModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowInterestModal(false)} />
                    <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <button
                            onClick={() => setShowInterestModal(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="text-xl font-bold text-slate-800 mb-2">Express Interest</h3>
                        <p className="text-slate-500 mb-6">Let the agent know you're interested in this property.</p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
                            <textarea
                                value={interestMessage}
                                onChange={(e) => setInterestMessage(e.target.value)}
                                placeholder="Add a message for the agent..."
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowInterestModal(false)}
                                className="flex-1 py-3 border border-gray-200 text-slate-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleInterest('interested')}
                                disabled={submitting}
                                className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetailPage;