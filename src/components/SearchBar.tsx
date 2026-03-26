import React from "react"

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({value, onChange}: SearchBarProps) => {
  return (
    <div className='mb-12 relative group max-w-2xl mx-auto'>
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <svg className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search users by name or email..."
        value={value}
        onChange={onChange}
        className="w-full pl-14 pr-4 py-4 bg-white/70 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-700 dark:text-slate-200 transition-all duration-300 text-lg"
      />
    </div>
  )
}

export default SearchBar
