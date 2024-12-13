"use client";

import React from "react";
import { collapseTailwindClassName } from "@/util/collapseTailwindClassName";
import { useMenuManager } from "@/hooks/useMenuManager";
import { useMenu } from "@/context/menu";

export default function Category() {
  const { menuList, selectedCategory, setSelectedCategory, isTouch, fontSize, mode } = useMenu();
  const {
    moveMenuRef,
    setTargetIndex,
    moveMenuEnd,
  } = useMenuManager(menuList as unknown as Record<string, ((string | number)[] | string | number)>[]);
  const dragProps = (index: number) => ({
    draggable: true,
    onDragStart: () => (moveMenuRef.current.startIndex = index),
    onDragOver: () => {
      moveMenuRef.current.targetIndex = index;
      setTargetIndex(index);
    },
    onDragEnd: () => {
      moveMenuEnd();
    },
  });
  const touchProps = (index: number) => ({
    onTouchStart: () => (moveMenuRef.current.startIndex = index),
    onTouchMove: () => {
      moveMenuRef.current.targetIndex = index;
      setTargetIndex(index);
    },
    onTouchEnd: () => {
      moveMenuEnd();
    },
  });

  const renderMenuStyle = (index: number) => {
    return {
      className: collapseTailwindClassName([
        "relative select-none h-[60px] inline-flex items-center justify-center transition-all duration-300 shadow-[-1px_0_0_#d1d5db]",
        selectedCategory === index
          ? `text-white font-bold`
          : `border-r bg-gray-100 ${
              selectedCategory - 1 === index || index % 5 === 5
                ? "border-gray-100"
                : "border-gray-300"
            } text-gray-500 font-medium`,
        moveMenuRef.current.startIndex === index
          ? "opacity-0"
          : moveMenuRef.current.startIndex === null
          ? "cursor-pointer"
          : "cursor-move",
        moveMenuRef.current?.startIndex !== null &&
        moveMenuRef.current?.targetIndex !== null &&
        moveMenuRef.current?.startIndex < index &&
        (moveMenuRef.current?.targetIndex || 0) -
          (moveMenuRef.current?.startIndex || 0) >
          0
          ? "-translate-x-full"
          : moveMenuRef.current?.startIndex !== null &&
            moveMenuRef.current?.targetIndex !== null &&
            moveMenuRef.current?.startIndex > index &&
            (moveMenuRef.current?.targetIndex || 0) -
              (moveMenuRef.current?.startIndex || 0) <
              0 &&
            moveMenuRef.current?.targetIndex <= index
          ? "translate-x-full"
          : "translate-x-0",
      ]),
      style: {
        backgroundColor:
          selectedCategory === index ? menuList[index].backgroundColor : "",
      },
    };
  };
  return (
    <>
      <div className="grid grid-cols-5 bg-gray-100" style={{
        fontSize: fontSize+'px'
      }}>
        {(menuList || []).map((menu, index) => (
          <div
            key={menu.categoryId}
            onClick={() => {
              if (moveMenuRef.current.startIndex === null)
                setSelectedCategory(index);
            }}
            {...(mode === "EDITOR" ? {...(isTouch ? touchProps(index) : dragProps(index))} : {})}
            {...renderMenuStyle(index)}
          >
            {menu.categoryName}
          </div>
        ))}
      </div>
    </>
  );
}