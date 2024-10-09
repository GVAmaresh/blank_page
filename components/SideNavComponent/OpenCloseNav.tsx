import { useEffect, useState } from "react";
import { WordBreakText } from "../Other/TextBreaker";
import { MdOutlineAddCircle } from "react-icons/md";
import { BlankPageInterface, getAllBlankPages } from "@/api/IndexedDb/indexdb";
import { usePageContext } from "@/app/PageProvider";

export default function OpenCloseNav({ open }: { open: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const { selectedId, updateId } = usePageContext();

  const baseStyle = {
    fontSize: "2rem",
    marginTop: "0.5rem",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    transition: "box-shadow 0.3s ease"
  };

  const hoverStyle = {
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 20px"
  };

  const [emojiList, setEmojiList] = useState<BlankPageInterface[]>([]);

  useEffect(() => {
    getAllBlankPages().then((data) => setEmojiList(data));
  }, [selectedId, updateId]);

  return (
    <div className="h-[90vh] overflow-hidden">
      <div className="bg-red-600 pr-2 h-full overflow-y-auto">
        {emojiList &&
          emojiList.map((data, index) => (
            <div
              className="flex gap-2 hover:bg-red-700 focus:bg-red-700 focus:outline-none cursor-pointer"
              key={data.id}
              style={{
                ...baseStyle,
                ...(hoveredIndex === index ? hoverStyle : {}),
                ...(clickedIndex === index ? hoverStyle : {})
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => {
                setClickedIndex(index);
                if (data?.id !== undefined) {
                  updateId(data.id);
                } else {
                  updateId(1);
                }
              }}
            >
              <div className="flex gap-2 ">
                <div className="text-lg md:text-2xl">{data.emoji}</div>
                {open && (
                  <div
                    className="bg-red-600 text-base mt-2"
                    style={{
                      transform: open ? "translateX(0)" : "translateX(-100%)",
                      opacity: open ? 1 : 0,
                      transition:
                        "transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
                    }}
                  >
                    {WordBreakText({
                      text: data.title
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        <div
          className="text-2xl mt-2 rounded-lg text-center flex justify-center p-2 cursor-pointer mb-4"
          onClick={() => {
            updateId(0);
          }}
        >
          <MdOutlineAddCircle size={30} />
        </div>
      </div>
    </div>
  );
}
