import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded transition ${
          i18n.language === "en"
            ? "bg-gray-700 text-white"
            : "bg-gray-300 text-black hover:text-white"
        } hover:bg-gray-700`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("ua")}
        className={`px-3 py-1 rounded transition ${
          i18n.language === "ua"
            ? "bg-gray-700 text-white"
            : "bg-gray-300 text-black hover:text-white"
        } hover:bg-gray-700`}
      >
        UA
      </button>
    </div>
  );
}
