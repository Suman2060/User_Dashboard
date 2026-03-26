"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/types";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const UserList = ({ initialUsers }: { initialUsers: User[] }) => {
  const { users, setUsers, searchTerm, setSearchTerm } = useUserStore();
  
  const [displayTerm, setDisplayTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(displayTerm);
    }, 400); 

    return () => clearTimeout(timer);
  }, [displayTerm, setSearchTerm]);

  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
    }
  }, [initialUsers, setUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full animate-in fade-in duration-700">
      <SearchBar 
        value={displayTerm} 
        onChange={(e) => setDisplayTerm(e.target.value)} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-xl text-slate-400 font-medium">No users found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div 
              key={user.id} 
              className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-800/80 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shadow-inner border-2 border-white dark:border-slate-800">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white truncate">{user.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="mb-6 pt-4 border-t border-slate-50 dark:border-slate-700/50">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">Company</p>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 truncate">{user.company.name}</p>
                </div>
              </div>

              <Link 
                href={`/users/${user.id}`}
                className="relative z-10 w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-xl font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors overflow-hidden"
              >
                <span>View Posts</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
