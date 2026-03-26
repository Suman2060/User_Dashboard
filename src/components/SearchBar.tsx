import React from "react"


interface SearchBarProps {
  value: string
  onChange: (e:
    React.ChangeEvent<HTMLInputElement>
  ) => void
}

const SearchBar = ({value,onChange}: SearchBarProps) => {
  return (
    <div className='mb-6'>
      <input
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
      
    </div>
  )
}

export default SearchBar
