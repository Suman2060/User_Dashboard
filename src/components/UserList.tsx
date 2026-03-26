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
    }, 500); 

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
    <div className="max-w-4xl mx-auto p-4">
      <SearchBar 
        value={displayTerm} 
        onChange={(e) => setDisplayTerm(e.target.value)} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="p-5 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-sm text-gray-400 mb-4">{user.company.name}</p>
              <Link 
                href={`/users/${user.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                View Posts
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
