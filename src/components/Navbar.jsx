import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-4 py-4 flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md">
      <div className="text-xl font-bold">Notes</div>
      <LanguageSwitcher />
    </nav>
  );
}
