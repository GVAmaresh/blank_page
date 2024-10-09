"use client";
import { WordBreakText } from "@/components/Other/TextBreaker";
import { useEffect, useState } from "react";
import { AiFillAliwangwang } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoReorderThree } from "react-icons/io5";
import IconToggle from "@/components/Other/IconToggle";
import OpenCloseNav from "@/components/SideNavComponent/OpenCloseNav";

export default function SideNav({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  const handleSideNav = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div>
        <div onClick={handleSideNav}>
          <IconToggle />
        </div>
      </div>
      <div className="bg-slate-500 flex flex-row overflow-hidden">
        <div className="">
          <OpenCloseNav open={open} />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
