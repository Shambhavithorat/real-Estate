import React, { useState, useEffect } from 'react';
import { userService } from '../../../user/services/userService';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');

  useEffect(() => {
    const unsubscribe = userService.subscribeUsers((data) => {
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
    try {
      await userService.updateUserStatus(userId, newStatus);
    } catch (error) {
      alert("Error updating user status: " + error.message);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-widest text-[10px]">Fetching Community Data...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Platform Users</h1>
          <p className="text-sm text-[#666666] mt-1">Manage {users.length} members across the platform</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E5E5E5] flex flex-col md:flex-row gap-4 bg-[#F7F7F5]/50">
           <div className="relative flex-1">
             <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#BBBBBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <input 
               type="text" 
               placeholder="Search by name or email..." 
               className="w-full bg-white border border-[#E5E5E5] pl-11 pr-4 py-3 rounded-2xl text-xs font-medium focus:ring-1 focus:ring-[#6B705C] outline-none transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <select 
             className="bg-white border border-[#E5E5E5] px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-[#111111] focus:ring-1 focus:ring-[#6B705C] outline-none cursor-pointer"
             value={roleFilter}
             onChange={(e) => setRoleFilter(e.target.value)}
           >
              <option>All Roles</option>
              <option>Buyer</option>
              <option>Seller</option>
              <option>Admin</option>
           </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#E5E5E5] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="px-8 py-5 font-bold">User Identity</th>
                <th className="px-8 py-5 font-bold">Role</th>
                <th className="px-8 py-5 font-bold">Registered On</th>
                <th className="px-8 py-5 font-bold">Account Status</th>
                <th className="px-8 py-5 font-bold text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] bg-white">
              {filteredUsers.length > 0 ? filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-[#FBFBF9] transition-all duration-300 group">
                  <td className="px-8 py-6 flex items-center gap-5">
                     <div className="w-12 h-12 bg-[#111111] text-white rounded-[18px] flex items-center justify-center text-sm font-bold shrink-0 shadow-sm transition-transform group-hover:scale-110">
                        {u.name?.charAt(0) || u.email?.charAt(0) || '?'}
                     </div>
                     <div className="space-y-0.5">
                        <span className="font-bold text-[#111111] text-sm block tracking-tight">{u.name || 'Anonymous User'}</span>
                        <span className="text-[11px] text-[#888888] font-medium">{u.email}</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-[#F7F7F5] text-[#111111] text-[9px] font-bold uppercase tracking-widest rounded-lg border border-[#E5E5E5]">
                      {u.role || 'Buyer'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-medium text-[#666666]">
                    {formatDate(u.createdAt || u.joined)}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-sm
                      ${u.status === 'Blocked' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${u.status === 'Blocked' ? 'bg-red-600' : 'bg-emerald-600'}`} />
                      {u.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <button className="h-10 px-4 rounded-xl bg-white border border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-[#666666] hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-all shadow-sm">
                        Details
                      </button>
                      <button 
                        onClick={() => handleStatusToggle(u.id, u.status || 'Active')}
                        className={`h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm
                          ${u.status === 'Blocked' 
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                            : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white'}`}
                      >
                        {u.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#F7F7F5] rounded-[24px] flex items-center justify-center text-[#BBBBBB]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111111] uppercase tracking-widest">No Members Found</h4>
                        <p className="text-[10px] text-[#666666] uppercase tracking-widest mt-1">Try adjusting your search or filters</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
