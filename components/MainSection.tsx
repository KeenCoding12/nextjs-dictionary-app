"use client";
import { BookX, SearchIcon, Volume2Icon } from "lucide-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function MainSection() {
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // handle Search
  const handleSearch = async (word: string) => {
    try {
      if (!word) return;

      setIsLoading(true);
      setError(null);
      setWordData(null);
      // Fetch API
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setWordData(response.data[0]);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("no_results");
      } else {
        setError("error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  //Fetch a random default word on first page load
  useEffect(() => {
    const words = ["serendipity", "code", "petrichor", "ethereal"];
    handleSearch(words[Math.floor(Math.random() * words.length)]);
  }, []);

  const phonetic =
    wordData?.phonetic || wordData?.phonetics.find((p: any) => p.text)?.text;

  const audio = wordData?.phonetics?.find((p: any) => p.audio)?.audio;

  return (
    <section className="py-4">
      {/* Search bar */}
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          className="relative flex items-center w-full rounded-full border border-border  bg-search-bg focus-within:border-neutral-400"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className="py-3 w-full outline-none px-6"
            placeholder="Search for any word..."
          />
          <button className="absolute top-0 bottom-0 right-4 hover:text-sky-600 focus:text-sky-600 transition-colors">
            <SearchIcon />
          </button>
        </form>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center mt-20">
          <div className="size-14 border-2 border-neutral-800 border-t-sky-500 rounded-full animate-spin" />
        </div>
      )}
      {/* error */}
      {!isLoading && error && error !== "no_results" && (
        <div className="flex items-center justify-center mt-14 sm:mt-20 lg:mt-40">
          <p>Something went wrong. Try again.</p>
        </div>
      )}

      {/* no results */}
      {!isLoading && error === "no_results" && (
        <div className="flex flex-col items-center text-center gap-4 py-10">
          <BookX size={32} className="text-neutral-400" />
          <h2 className="text-xl font-bold">No Definitions Found</h2>
          <p className="text-lg text-neutral-500 px-11">
            Sorry, we couldn&apos;t find definitions for the word you were
            looking for. Try another one.
          </p>
        </div>
      )}
      {/* Result */}
      {!isLoading && wordData && (
        <div className="mt-10 md:mt-14 flex flex-col gap-8 md:gap-10">
          {/* word */}
          <div className="space-y-5">
            {/* Word */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-3xl font-bold md:text-5xl">
                {wordData.word}
              </h3>
              {/* Audio */}
              {audio && (
                <div>
                  <button
                    className="size-10 sm:size-12 bg-sky-600 hover:bg-sky-700 focus:bg-sky-700 text-white transition-colors flex items-center justify-center rounded-full shrink-0"
                    onClick={() => audioRef.current?.play()}
                  >
                    <Volume2Icon size={22} />
                  </button>
                  <audio ref={audioRef} src={audio} />
                </div>
              )}
            </div>

            {/* Phonetic */}
            <p>{phonetic}</p>
          </div>

          {/* meaning */}
          {wordData.meanings.map((meaning: any, index: number) => (
            <div className="space-y-6" key={index}>
              <h3 className="italic font-bold text-xl">
                {meaning.partOfSpeech}
              </h3>
              <div className="space-y-5">
                <h3 className="text-lg font-medium sm:text-xl">Meaning</h3>
                {/* Meaning */}
                <ul className="list-disc marker:text-sky-600 ml-5 md:ml-11 space-y-2">
                  {meaning.definitions.map((def: any, index: number) => (
                    <li key={index}>
                      <p>{def.definition}</p>
                      {def.example && (
                        <p className="italic text-neutral-500">
                          Example: {def.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Synonyms */}
              {meaning.synonyms?.length > 0 && (
                <div className="space-y-5">
                  <h3 className="font-semibold">Synonyms</h3>
                  <div className="flex gap-2.5 sm:gap-4 text-sky-600 flex-wrap">
                    {meaning.synonyms.map((syn: any, index: number) => (
                      <span
                        key={index}
                        className="font-bold hover:underline cursor-pointer"
                        onClick={() => {
                          handleSearch(syn);
                        }}
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
