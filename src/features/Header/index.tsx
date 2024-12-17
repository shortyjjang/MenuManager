"use client";
import { useMenu } from "@/context/menu";
import Dropdown from "@/entities/Dropdown";
import IconDrag from "@/entities/icons/IconDrag";
import React, { useState } from "react";
import cookieStore from "js-cookie"

export default function Header() {
  const { mode, setMode, fontSize, setFontSize, menuList, setMenuList } = useMenu();
  const [isOpenFont, setIsOpenFont] = useState(false);
  return (
    <div className="bg-black h-[50px] text-white flex justify-end items-center px-[12px] gap-2">
      {mode === "NORMAL" ? (
        <button
          className="border border-white border-opacity-60 h-[32px] w-[70px] text-[12px]"
          onClick={() => {
            setMode("READY");
          }}
        >
          편집
        </button>
      ) : (
        <>
          <div className="relative">
            <button
              onClick={() => setIsOpenFont(!isOpenFont)}
              className={`font-bold flex items-start text-[15px] gap-px px-1 outline-none ${isOpenFont ? "opacity-100" : "opacity-60"}`}
            >
              가<span className="text-[12px] -mt-2">+</span>
            </button>
            {isOpenFont && (
              <Dropdown
                options={[
                  { label: "큰 글씨", value: 18 },
                  { label: "보통 글씨", value: 16 },
                  { label: "작은 글씨", value: 14 },
                ]}
                value={fontSize}
                className="absolute top-full min-w-[120px] right-0 w-fit shadow-lg text-[13px] z-[+1]"
                onChange={(value) => setFontSize(Number(value))}
              />
            )}
          </div>
          <button
            onClick={() => setMode("EDITOR")}
            className={`font-bold flex items-start text-[15px] gap-px px-1 outline-none ${mode === "EDITOR" ? "opacity-100" : "opacity-60"}`}
          >
            <IconDrag />
          </button>
          <button
            className="border border-white border-opacity-60 h-[32px] w-[70px] text-[12px]"
            onClick={() => {
              cookieStore.set("menus", JSON.stringify(menuList));
              cookieStore.set("fontSize", JSON.stringify(fontSize));
              setMode("NORMAL");
            }}
          >
            저장
          </button>
          <button
            className="border border-white border-opacity-40 text-gray-400 h-[32px] w-[70px] text-[12px]"
            onClick={() => { 
            setFontSize(cookieStore.get("fontSize") ? Number(cookieStore.get("fontSize") as string) : 16)
            setMenuList(cookieStore.get("menus") ? JSON.parse(cookieStore.get("menus") as string) : [])
              setMode("NORMAL");
            }}
          >
            취소
          </button>
        </>
      )}
    </div>
  );
}
