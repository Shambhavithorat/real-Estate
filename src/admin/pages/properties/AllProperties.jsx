import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { propertyService } from '../../../user/services/propertyService';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [newProperty, setNewProperty] = useState({
    title: '', price: '', propertyType: 'Villa', listingType: 'Sale',
    beds: '', baths: '', sqft: '', furnishing: 'Fully Furnished',
    parking: 'Parking Available', status: 'Available', ownerName: '',
    ownerPhone: '', city: '', state: '', address: '', amenities: '',
    description: '', image: '', images: '', featured: false
  });

  useEffect(() => {
    const unsubscribe = propertyService.subscribeProperties((data) => {
      setProperties(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setNewProperty({
      title: '', price: '', propertyType: 'Villa', listingType: 'Sale',
      beds: '', baths: '', sqft: '', furnishing: 'Fully Furnished',
      parking: 'Parking Available', status: 'Available', ownerName: '',
      ownerPhone: '', city: '', state: '', address: '', amenities: '',
      description: '', image: '', images: '', featured: false
    });
    setEditingPropertyId(null);
  };

  const handleEdit = (property) => {
    setEditingPropertyId(property.id);
    setNewProperty({
      ...property,
      amenities: Array.isArray(property.amenities) ? property.amenities.join(', ') : property.amenities || '',
      images: Array.isArray(property.images) ? property.images.join(', ') : property.images || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await propertyService.deleteProperty(id);
        alert("Deleted!");
      } catch (err) {
        alert("Error deleting");
      }
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ...newProperty,
        price: Number(newProperty.price),
        beds: Number(newProperty.beds),
        baths: Number(newProperty.baths),
        sqft: Number(newProperty.sqft),
        area: Number(newProperty.sqft),
        type: newProperty.propertyType,
        location: `${newProperty.city}, ${newProperty.state}`,
        amenities: typeof newProperty.amenities === 'string' ? newProperty.amenities.split(',').map(item => item.trim()).filter(i => i) : newProperty.amenities,
        images: typeof newProperty.images === 'string' ? newProperty.images.split(',').map(item => item.trim()).filter(i => i) : newProperty.images,
        updatedAt: new Date().toISOString()
      };

      if (editingPropertyId) await propertyService.updateProperty(editingPropertyId, propertyData);
      else await propertyService.addProperty(propertyData);
      
      setShowAddModal(false);
      resetForm();
      alert("Success!");
    } catch (err) {
      alert("Error saving");
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    if (!price) return '₹0';
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lac`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-widest text-[10px]">Loading Properties...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div><h1 className="text-2xl font-bold text-[#111111]">Platform Properties</h1><p className="text-sm text-[#666666] mt-1">Live from Cloud Storage</p></div>
        <button onClick={() => { resetForm(); setShowAddModal(true); }} className="bg-[#111111] text-white py-3 px-6 text-xs flex items-center gap-2 rounded-xl hover:bg-[#6B705C] transition-all shadow-lg">+ Add Property</button>
      </div>

      <div className="bg-white rounded-[32px] border border-[#F0F0F0] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#F0F0F0] flex gap-4 bg-white items-center">
          <div className="relative flex-1"><input type="text" placeholder="Search..." className="w-full bg-[#F7F7F5] border-none px-6 py-3.5 rounded-2xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#111111]/10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[1000px]">
            <thead><tr className="bg-[#FBFBF9] text-[10px] uppercase tracking-widest text-[#666666] border-b border-[#F0F0F0]"><th className="px-8 py-6 font-bold">Property Identity</th><th className="px-6 py-6 font-bold">Financials</th><th className="px-6 py-6 font-bold">Status</th><th className="px-8 py-6 text-right font-bold">Actions</th></tr></thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {filteredProperties.length > 0 ? filteredProperties.map(p => (
                <tr key={p.id} className="hover:bg-[#FBFBF9] transition-all group">
                  <td className="px-8 py-6 flex items-center gap-5"><div className="w-16 h-16 bg-[#F7F7F5] rounded-2xl overflow-hidden relative"><img src={p.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" /></div><div><span className="font-bold text-[#111111] text-sm block">{p.title}</span><span className="text-[10px] text-[#BBBBBB] uppercase font-bold mt-1">ID: {p.id.substring(0,8)}</span></div></td>
                  <td className="px-6 py-6 font-bold text-[#111111] text-sm">{formatPrice(p.price)}</td>
                  <td className="px-6 py-6"><span className={`px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase ${p.status === 'Sold' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>{p.status || 'Available'}</span></td>
                  <td className="px-8 py-6 text-right flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => handleEdit(p)} className="p-3 rounded-xl bg-white border border-[#EEEEEE] hover:bg-[#111111] hover:text-white transition-all">Edit</button><button onClick={() => handleDelete(p.id)} className="p-3 rounded-xl bg-white border border-[#EEEEEE] hover:bg-red-500 hover:text-white transition-all">Delete</button></td>
                </tr>
              )) : <tr><td colSpan="4" className="py-20 text-center text-[10px] font-bold uppercase text-[#999999]">No properties found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-[24px]" style={{ WebkitBackdropFilter: 'blur(24px)' }} onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col overflow-y-auto no-scrollbar p-8 md:p-12 animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-center mb-12 pb-8 border-b border-[#F0F0F0]">
              <div><h2 className="text-4xl font-bold text-[#111111] tracking-tight">{editingPropertyId ? 'Update' : 'Add'} <span className="text-[#6B705C] italic">Property</span></h2></div>
              <button onClick={() => setShowAddModal(false)} className="w-14 h-14 bg-[#F7F7F5] rounded-2xl flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all">✕</button>
            </div>
            <form onSubmit={handleAddProperty} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Title</label><input type="text" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#111111]/10" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} required /></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price</label><input type="number" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#111111]/10" value={newProperty.price} onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })} required /></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Type</label><select className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none appearance-none cursor-pointer" value={newProperty.propertyType} onChange={(e) => setNewProperty({ ...newProperty, propertyType: e.target.value })}><option>Villa</option><option>Apartment</option><option>House</option></select></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Listing</label><select className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none appearance-none cursor-pointer" value={newProperty.listingType} onChange={(e) => setNewProperty({ ...newProperty, listingType: e.target.value })}><option>Sale</option><option>Rent</option></select></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Beds</label><input type="number" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.beds} onChange={(e) => setNewProperty({ ...newProperty, beds: e.target.value })} /></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Baths</label><input type="number" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.baths} onChange={(e) => setNewProperty({ ...newProperty, baths: e.target.value })} /></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Area (sqft)</label><input type="number" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.sqft} onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">City</label><input type="text" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.city} onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })} required /></div>
                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">State</label><input type="text" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.state} onChange={(e) => setNewProperty({ ...newProperty, state: e.target.value })} /></div>
              </div>
              <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Cover Image URL</label><input type="text" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" value={newProperty.image} onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })} /></div>
              <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Description</label><textarea rows="5" className="w-full bg-[#F7F7F5] border-none rounded-[32px] p-8 outline-none resize-none" value={newProperty.description} onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })} /></div>
              <div className="pt-8 flex gap-6"><button type="submit" className="flex-[2] bg-[#111111] text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:bg-[#6B705C] transition-all">Confirm Property</button><button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-[#F7F7F5] text-[#111111] py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">Cancel</button></div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AllProperties;
