import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../../../user/services/propertyService';

const AddProperty = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        address: '',
        type: 'Residential', // Default
        category: 'Buy',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Default placeholder
        status: 'Available',
        features: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Convert numbers
            const formattedData = {
                ...formData,
                price: parseFloat(formData.price),
                bedrooms: parseInt(formData.bedrooms),
                bathrooms: parseInt(formData.bathrooms),
                area: parseFloat(formData.area),
                createdAt: new Date()
            };

            await propertyService.addProperty(formattedData);
            alert('Property added successfully!');
            navigate('/admin/properties');
        } catch (error) {
            console.error('Error adding property:', error);
            alert('Failed to add property');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12 text-left">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#111111]">Add New Property</h1>
                    <p className="text-sm text-[#666666] mt-1">Create a new listing in the Firestore database.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm space-y-8 text-left">
                {/* Basic Information */}
                <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-4 border-b pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Property Title</label>
                            <input
                                required
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Modern Luxury Villa"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Price ($)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 500000"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                    </div>
                </div>

                {/* Location & Details */}
                <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-4 border-b pb-2">Location & Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Location City</label>
                            <input
                                required
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Mumbai, Maharashtra"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Full Address</label>
                            <input
                                required
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="e.g. 123 Street, Area Name"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Property Type</label>
                            <select 
                                name="type" 
                                value={formData.type} 
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            >
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Villa">Villa</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Plot">Plot</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Listing Category</label>
                            <select 
                                name="category" 
                                value={formData.category} 
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            >
                                <option value="Buy">For Sale</option>
                                <option value="Rent">For Rent</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-4 border-b pb-2">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Bedrooms</label>
                            <input
                                required
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder="e.g. 3"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Bathrooms</label>
                            <input
                                required
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder="e.g. 2"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Area (Sq.Ft)</label>
                            <input
                                required
                                type="number"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                placeholder="e.g. 1500"
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                    </div>
                </div>

                {/* Description & Image */}
                <div>
                    <h3 className="text-lg font-bold text-[#111111] mb-4 border-b pb-2">Description & Media</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Description</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe the property details..."
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            ></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-[#111111]">Image URL (Unsplash/Link)</label>
                            <input
                                required
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#6B705C]/20 focus:border-[#6B705C]"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/properties')}
                        className="px-6 py-2 border border-[#E5E5E5] rounded-lg text-[#666666] hover:bg-gray-50 font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="px-8 py-2 bg-[#111111] text-white rounded-lg hover:bg-black font-semibold disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : 'Publish Property'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;
