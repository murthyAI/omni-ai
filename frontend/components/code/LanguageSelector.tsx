"use client";

type LanguageSelectorProps = {
  selectedLanguage: string;
  loading: boolean;
  onLanguageChange: (language: string) => void;
};

const programmingLanguages = [
  { value: "auto", label: "Auto Detect" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "tailwind", label: "Tailwind CSS" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "dart", label: "Dart" },
  { value: "flutter", label: "Flutter" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash / Shell" },
];

export default function LanguageSelector({
  selectedLanguage,
  loading,
  onLanguageChange,
}: LanguageSelectorProps) {
  return (
    <div>
      <label
        htmlFor="code-language"
        className="text-sm font-semibold text-zinc-300"
      >
        Programming Language
      </label>

      <select
        id="code-language"
        value={selectedLanguage}
        disabled={loading}
        onChange={(event) =>
          onLanguageChange(event.target.value)
        }
        className="mt-3 w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {programmingLanguages.map((language) => (
          <option
            key={language.value}
            value={language.value}
          >
            {language.label}
          </option>
        ))}
      </select>

      <p className="mt-2 text-xs text-zinc-500">
        Choose a language or allow OMNI AI to detect it automatically.
      </p>
    </div>
  );
}