export default function Button({ onClick, text }) {
  return (
    <div className="text-center m-10">
      <button
        onClick={onClick}
        className="px-6 py-3 text-xl bg-blue-900 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {text}
      </button>
    </div>
  );
}
