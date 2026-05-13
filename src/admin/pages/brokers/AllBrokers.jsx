import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { agentService } from '../../../user/services/agentService';

const AllBrokers = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); 
  const [editingBroker, setEditingBroker] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newBroker, setNewBroker] = useState({
    name: '',
    email: '',
    phone: '',
    agencyName: '',
    experience: '',
    specialization: '',
    photoURL: '',
    description: '',
    verified: true,
    type: 'Broker',
    city: 'Pune',
    status: 'Active'
  });

  useEffect(() => {
    const unsubscribe = agentService.subscribeAgents((data) => {
      setAgents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBroker(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddBroker = async (e) => {
    if (e) e.preventDefault();
    if (!newBroker.name || !newBroker.email || !newBroker.city || !newBroker.agencyName || !newBroker.experience) {
      alert("Validation Error: Please provide all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingBroker) {
        await agentService.updateAgent(editingBroker.id, newBroker);
        alert("Broker profile updated!");
      } else {
        await agentService.addAgent(newBroker);
        alert("Broker partner onboarded!");
      }
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewBroker({
      name: '', email: '', phone: '', agencyName: '', experience: '',
      specialization: '', photoURL: '', description: '', verified: true,
      type: 'Broker', city: 'Pune', status: 'Active'
    });
    setEditingBroker(null);
    setActiveTab('personal');
  };

  const handleEdit = (broker) => {
    setEditingBroker(broker);
    setNewBroker({ ...broker });
    setShowAddModal(true);
  };

  const handleStatusToggle = async (brokerId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      await agentService.updateAgentStatus(brokerId, newStatus);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const filteredBrokers = agents.filter(a => 
    (a.type === 'Broker' || !a.type) && (
      (a.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (a.agencyName || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-widest text-[10px]">Syncing Partners...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-12 relative min-h-screen bg-[#FBFBFB] -m-4 p-8 rounded-[40px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-[#111111] tracking-tighter">Premium <span className="text-[#6B705C] italic font-serif">Brokers</span></h1>
          <p className="text-xs font-bold text-[#999999] uppercase tracking-[0.4em] flex items-center gap-3"><span className="w-10 h-[1px] bg-[#6B705C]" />Network Management</p>
        </div>
        <button onClick={() => { resetForm(); setShowAddModal(true); }} className="bg-[#111111] text-white py-5 px-12 text-[10px] font-bold uppercase tracking-[0.3em] rounded-[24px] hover:bg-[#6B705C] transition-all shadow-xl hover:-translate-y-2 group flex items-center gap-4">
          <span className="text-xl group-hover:rotate-90 transition-transform">★</span>
          Onboard Partner
        </button>
      </div>

      <div className="relative group mx-2">
        <input type="text" placeholder="Search brokers..." className="w-full bg-white border-0 ring-1 ring-[#F0F0F0] focus:ring-2 focus:ring-[#111111] pl-16 pr-8 py-6 rounded-[32px] text-sm font-medium outline-none shadow-sm transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl">🔎</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {filteredBrokers.length > 0 ? filteredBrokers.map(a => (
          <div key={a.id} className="group relative bg-[#FAF9F6] p-5 rounded-[32px] border border-[#E5E5E5] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F7F7F5] rounded-full group-hover:bg-[#6B705C]/10 transition-colors" />
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[24px] bg-[#F7F7F5] mb-4 overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-1000">
                <img src={a.photoURL || `https://i.pravatar.cc/300?u=${a.id}`} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                {a.verified && <div className="absolute bottom-1.5 right-1.5 w-5 h-5 bg-[#6B705C] text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg text-[7px]">✓</div>}
              </div>
              <h3 className="text-base font-bold text-[#111111] tracking-tight truncate w-full px-1">{a.name}</h3>
              <p className="text-[8px] font-bold uppercase tracking-widest text-[#6B705C] mt-1.5 bg-[#6B705C]/5 px-3 py-1 rounded-full border border-[#6B705C]/10">{a.agencyName}</p>
              <div className="mt-6 grid grid-cols-2 gap-2 w-full border-t border-[#F5F5F5] pt-6">
                <div className="space-y-0.5"><span className="block text-lg font-black text-[#111111]">{a.experience}y+</span><span className="block text-[7px] font-bold uppercase text-[#999999] tracking-widest">Exp</span></div>
                <div className="space-y-0.5 border-l border-[#F5F5F5]"><span className="block text-lg font-black text-[#111111] truncate px-1">{a.city}</span><span className="block text-[7px] font-bold uppercase text-[#999999] tracking-widest">City</span></div>
              </div>
              <div className="mt-6 flex gap-2 w-full transition-all duration-700">
                <button onClick={() => handleEdit(a)} className="flex-[2] py-3 bg-[#111111] text-white rounded-[16px] text-[8px] font-bold uppercase tracking-widest hover:bg-[#6B705C] transition-all">Edit Broker</button>
                <button onClick={() => handleStatusToggle(a.id, a.status || 'Active')} className={`flex-1 py-3 rounded-[16px] text-[8px] font-bold uppercase tracking-widest transition-all ${a.status === 'Suspended' ? 'bg-emerald-500 text-white' : 'bg-red-50 text-red-600'}`}>{a.status === 'Suspended' ? 'Enable' : 'Off'}</button>
              </div>
              <div className="mt-5 flex items-center gap-1.5 transition-opacity">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${a.status === 'Suspended' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span className={`text-[8px] font-bold uppercase tracking-widest ${a.status === 'Suspended' ? 'text-red-500' : 'text-emerald-500'}`}>{a.status || 'Active'} Partner</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-20"><p className="text-sm font-bold text-[#999999] uppercase tracking-widest">No brokers found matching search.</p></div>
        )}
      </div>

      {showAddModal && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-[24px]" style={{ WebkitBackdropFilter: 'blur(24px)' }} onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#FBFBFB] w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
            {/* Sidebar */}
            <div className="w-full md:w-80 bg-white border-r border-[#EEEEEE] p-8 md:p-12 flex flex-col justify-between shrink-0">
               <div className="space-y-10">
                  <div className="w-12 h-12 bg-[#111111] text-white rounded-2xl flex items-center justify-center font-black shadow-xl italic">B</div>
                  <nav className="space-y-2">
                     {[{ id: 'personal', label: 'Identity', icon: '👔' }, { id: 'professional', label: 'Market', icon: '📈' }, { id: 'media', label: 'Brand', icon: '🏠' }].map(tab => (
                       <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#111111] text-white shadow-lg translate-x-2' : 'text-[#666666] hover:bg-[#F7F7F5]'}`}><span className="text-base">{tab.icon}</span>{tab.label}</button>
                     ))}
                  </nav>
               </div>
               <button onClick={() => setShowAddModal(false)} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 ml-4">Discard</button>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white/50">
               <div className="px-8 md:px-16 pt-12 pb-6 border-b border-[#F0F0F0] flex justify-between items-center">
                  <h4 className="text-2xl font-bold text-[#111111]">{activeTab === 'personal' ? 'Core Identity' : activeTab === 'professional' ? 'Market Background' : 'Brand Display'}</h4>
                  <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full ${activeTab === 'personal' ? 'bg-[#111111]' : 'bg-[#EEEEEE]'}`} />
                    <div className={`w-2 h-2 rounded-full ${activeTab === 'professional' ? 'bg-[#111111]' : 'bg-[#EEEEEE]'}`} />
                    <div className={`w-2 h-2 rounded-full ${activeTab === 'media' ? 'bg-[#111111]' : 'bg-[#EEEEEE]'}`} />
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 no-scrollbar">
                  <form onSubmit={(e) => e.preventDefault()} className="max-w-3xl space-y-10">
                     {activeTab === 'personal' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Broker Name</label><input required name="name" value={newBroker.name} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="Vikram Malhotra" /></div>
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Official Email</label><input required type="email" name="email" value={newBroker.email} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="vikram@realty.com" /></div>
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Direct Contact</label><input name="phone" value={newBroker.phone} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="+91 90000 00000" /></div>
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Territory</label><select name="city" value={newBroker.city} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-bold outline-none appearance-none"><option>Pune</option><option>Mumbai</option><option>Nagpur</option><option>Nashik</option></select></div>
                          </div>
                       </div>
                     )}
                     {activeTab === 'professional' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Firm Name</label><input required name="agencyName" value={newBroker.agencyName} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="Skyline Properties" /></div>
                             <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Market Experience</label><input required type="number" name="experience" value={newBroker.experience} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="10" /></div>
                             <div className="col-span-full space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Specializations</label><input name="specialization" value={newBroker.specialization} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-6 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="Investment Portfolios..." /></div>
                          </div>
                       </div>
                     )}
                     {activeTab === 'media' && (
                       <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-10">
                          <div className="flex flex-col md:flex-row gap-10 items-start">
                             <div className="w-40 h-40 bg-[#F7F7F5] rounded-[48px] overflow-hidden shadow-2xl border-4 border-white shrink-0"><img src={newBroker.photoURL || 'https://i.pravatar.cc/300'} className="w-full h-full object-cover" /></div>
                             <div className="flex-1 space-y-6">
                                <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Avatar URL</label><input name="photoURL" value={newBroker.photoURL} onChange={handleInputChange} className="w-full bg-[#F7F7F5] border-0 px-8 py-5 rounded-[24px] text-sm font-medium outline-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="https://..." /></div>
                                <label className="flex items-center gap-4 p-6 bg-white border-2 border-[#F0F0F0] rounded-[32px] cursor-pointer"><input type="checkbox" name="verified" checked={newBroker.verified} onChange={handleInputChange} className="sr-only" /><div className={`w-12 h-7 rounded-full transition-all relative ${newBroker.verified ? 'bg-[#6B705C]' : 'bg-[#E5E5E5]'}`}><div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${newBroker.verified ? 'left-6' : 'left-1'}`} /></div><span className="text-[11px] font-bold uppercase tracking-widest text-[#111111]">Premium Badge</span></label>
                             </div>
                          </div>
                          <div className="space-y-3"><label className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">Biography</label><textarea name="description" value={newBroker.description} onChange={handleInputChange} rows="5" className="w-full bg-[#F7F7F5] border-0 p-8 rounded-[32px] text-sm font-medium outline-none resize-none focus:ring-2 focus:ring-[#111111] transition-all" placeholder="Track record..." /></div>
                       </div>
                     )}
                  </form>
               </div>
               {/* Footer */}
               <div className="px-8 md:px-16 py-10 bg-[#FBFBFB] border-t border-[#F0F0F0] flex justify-between items-center shrink-0">
                  <div className="flex gap-4">
                     {activeTab !== 'personal' && <button onClick={() => setActiveTab(activeTab === 'media' ? 'professional' : 'personal')} className="px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-[#EEEEEE] hover:bg-white transition-all">Previous</button>}
                     {activeTab !== 'media' ? <button onClick={() => setActiveTab(activeTab === 'personal' ? 'professional' : 'media')} className="px-12 py-5 bg-[#111111] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#6B705C] transition-all">Next</button> : <button disabled={isSubmitting} onClick={handleAddBroker} className="px-12 py-5 bg-[#111111] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all">{isSubmitting ? 'Syncing...' : (editingBroker ? 'Update' : 'Confirm')}</button>}
                  </div>
               </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AllBrokers;
