export default function SearchBar({ search, setSearch }) {
  return (
    <div className="my-10 w-4xl m-auto">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search notes..."
        className="w-full rounded-lg border px-5 py-2"
      />
    </div>
  );
}
