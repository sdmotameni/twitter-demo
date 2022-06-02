import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useState, useRef } from "react";

export default function TweetBox() {
  const [input, setInput] = useState<string>("");
  const [imgSelectorOpen, setImgSelectorOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(null);

  const imageInputRef = useRef(null);

  const handleImageSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef?.current.value) return;

    setImageUrl(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImgSelectorOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex p-5 space-x-2">
      <img
        className="object-cover mt-4 rounded-full h-14 w-14"
        src="https://links.papareact.com/gll"
        alt=""
      />
      <div className="flex items-center flex-1 pl-2">
        <form className="flex flex-col flex-1">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="What's happening?"
            className="w-full h-24 text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImgSelectorOpen(!imgSelectorOpen)}
                className="w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150"
              />
              <SearchCircleIcon className="w-5 h-5" />
              <EmojiHappyIcon className="w-5 h-5" />
              <CalendarIcon className="w-5 h-5" />
              <LocationMarkerIcon className="w-5 h-5" />
            </div>
            <button
              disabled={!input}
              className="px-5 py-2 font-bold text-white rounded-full bg-twitter disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imgSelectorOpen && (
            <div className="flex justify-between px-4 py-4 mt-3 text-white rounded-lg bg-twitter/50">
              <input
                ref={imageInputRef}
                className="flex-1 text-sm bg-transparent outline-none placeholder:text-white"
                type="text"
                placeholder="Enter image URL..."
              />
              <button
                onClick={handleImageSubmit}
                className="ml-2 font-bold text-white text-md"
              >
                Add Image
              </button>
            </div>
          )}
          {imageUrl && (
            <img
              className="object-contain w-full h-40 mt-10 shadow-lg rounded-xl"
              src={imageUrl}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}
