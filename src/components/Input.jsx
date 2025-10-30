function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full max-h-[40px] border border-gray-300 rounded-md py-2.5 px-3 text-m text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
      />
    </div>
  );
}

export default Input;
