export default function Button({ onClick, text, variant = 'primary' }) {
  const baseClasses =
    'px-6 py-3 text-xl  rounded-lg hover:gb-opacity-80 focus:outline-none focus:ring-2 focus:ring-opacity-50';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-900 text-white focus:ring-violet-600 hover:bg-blue-700'
      : 'bg-gray-300 text-gray-800 focus:ring-gray-500 hover:bg-gray-100';

  return (
    <div className="text-center m-5">
      <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
        {text}
      </button>
    </div>
  );
}
