"use client";
import {
  addBlankPage,
  getBlankPage,
  updateBlankPage
} from "@/api/IndexedDb/indexdb";
import { usePageContext } from "@/app/PageProvider";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { EmptyPage } from "../Other/EmptyPage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

export default function ImportComponent() {
  const generateRandomId = () => Math.floor(Math.random() * 1000000);

  const { selectedId, updateId } = usePageContext();
  const [emoji, setEmoji] = useState("❓");
  const [title, setTitle] = useState("Title");
  const [id, setId] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("Short description");
  const [context, setContext] = useState("Start Typing here...");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [rows, setRows] = useState<number>(1);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(event.target.value);
    const lineCount = (event.target.value.match(/\n/g) || []).length + 1;
    setRows(lineCount);
  };

  // Update the handler to use EmojiClickData
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    const handlePage = async () => {
      if (selectedId == null) {
        return;
      } else if (selectedId === 0) {
        const newId = generateRandomId();
        await addBlankPage({
          id: newId,
          emoji: "❓",
          title: "Title",
          description: "Short description",
          context: "Start Typing here..."
        });
        setId(newId);
        updateId(newId);
      } else {
        const pageData = await getBlankPage(selectedId);
        if (pageData) {
          setId(pageData.id);
          setEmoji(pageData.emoji);
          setTitle(pageData.title);
          setDescription(pageData.description);
          setContext(pageData.context);
        }
      }
    };
    handlePage();
  }, [selectedId]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [context]);

  useEffect(() => {
    const updatePage = async () => {
      if (id) {
        await updateBlankPage(id, { emoji, title, description, context });
      }
    };

    if (id) {
      updatePage();
    }
  }, [emoji, title, description, context, id]);

  return (
    <div className="">
      {selectedId == null ? (
        <div className="">
          <EmptyPage />
        </div>
      ) : (
        <div className="ml-3 md:ml-8 lg:ml-14 pt-10 h-[90vh] overflow-hidden">
          <div className="overflow-y-auto h-[80vh]">
            <div className="flex gap-4 items-start">
              <div
                className="text-2xl md:text-2xl lg:text-4xl mt-4 cursor-pointer"
                onClick={handleEmojiToggle}
              >
                {emoji}
              </div>
              <div className="flex flex-col gap-4 bg-transparent w-full mr-10">
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            {showEmojiPicker && (
              <div>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <div className="px-2 mt-3">
              <textarea
                placeholder={"Start Writing Here..."}
                ref={textAreaRef}
                value={context}
                onChange={handleChange}
                className="p-0 md:p-3 text-base md:text-lg lg:text-2xl mt-6 w-full bg-transparent border-transparent resize-none"
                style={{ borderColor: "transparent" }}
                rows={rows}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
