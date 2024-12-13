"use client";

import React, { useRef } from "react";
import { useMenuManager } from "@/hooks/useMenuManager";
import { useMenu } from "@/context/menu";
import { ProductType } from "@/util/getMenus";
import { collapseTailwindClassName } from "@/util/collapseTailwindClassName";

export default function Menus() {
  const { menuList, selectedCategory, setMenuList, isTouch, fontSize, mode } = useMenu();
  const currentMenu = menuList[selectedCategory] || { productList: [] };
  const { moveMenuRef, setTargetIndex, moveMenuEnd } = useMenuManager(
    currentMenu.productList as unknown as Record<
      string,
      (string | number)[] | string | number
    >[]
  );
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const dropProps = (index: number) => ({
    draggable: true,
    onDragStart: () => (moveMenuRef.current.startIndex = index),
    onDragOver: (event: React.DragEvent) => {
      moveMenuRef.current.targetIndex = index;
      setTargetIndex(index);

      // 스크롤 이동 로직 추가
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        const { clientY } = event;
        const { top, bottom } = scrollElement.getBoundingClientRect();
        const scrollThreshold = 20; // 스크롤을 시작할 임계값

        if (clientY < top + scrollThreshold) {
          scrollElement.scrollTop -= 10; // 위로 스크롤
        } else if (clientY > bottom - scrollThreshold) {
          scrollElement.scrollTop += 10; // 아래로 스크롤
        }
      }
    },
    onDragEnd: () => {
      const newProductMenuList = moveMenuEnd();
      if (newProductMenuList) {
        const newMenuList = [...menuList];
        newMenuList[selectedCategory].productList =
          newProductMenuList as unknown as ProductType[];
        setMenuList(newMenuList);
      }
    },
  });
  const touchProps = (index: number) => ({
    onTouchStart: () => (moveMenuRef.current.startIndex = index),
    onTouchMove: () => {
      moveMenuRef.current.targetIndex = index;
      setTargetIndex(index);
    },
    onTouchEnd: () => {
      const newProductMenuList = moveMenuEnd();
      if (newProductMenuList) {
        const newMenuList = [...menuList];
        newMenuList[selectedCategory].productList =
          newProductMenuList as unknown as ProductType[];
        setMenuList(newMenuList);
      }
    },
  });
  const renderClassName = (index: number) => {
    return collapseTailwindClassName([
      "transition-all duration-300 bg-white shadow-md relative rounded-md p-4 inline-flex flex-col justify-between gap-2 ",
      moveMenuRef.current?.startIndex !== null && moveMenuRef.current?.startIndex === index ? 'opacity-0' : '',
      moveMenuRef.current?.startIndex !== null &&
      moveMenuRef.current?.targetIndex !== null &&
      moveMenuRef.current?.startIndex < index &&
      (moveMenuRef.current?.targetIndex || 0) -
        (moveMenuRef.current?.startIndex || 0) >
        0 && Math.floor(moveMenuRef.current?.targetIndex / 5) === Math.floor(index / 5) && moveMenuRef.current?.targetIndex >= index
        ? "-translate-x-full"
        : moveMenuRef.current?.startIndex !== null &&
          moveMenuRef.current?.targetIndex !== null &&
          moveMenuRef.current?.startIndex > index &&
          (moveMenuRef.current?.targetIndex || 0) -
            (moveMenuRef.current?.startIndex || 0) <
            0 && Math.floor(moveMenuRef.current?.targetIndex / 5) === Math.floor(index / 5) && moveMenuRef.current?.targetIndex <= index
        ? "translate-x-full"
        : "translate-x-0",
    ]);
  };

  return (
    <div className="h-[calc(100vh-110px)] overflow-auto" ref={scrollRef} style={{
      fontSize: fontSize+'px'
    }}>
      <div
        className={`grid grid-cols-5 relative gap-2 p-4 border-t border-gray-300`}
        style={{
          gridAutoRows: "1fr",
        }}
      >
        <span
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundColor: currentMenu.backgroundColor || "transparent",
          }}
        ></span>
        {currentMenu.productList.map((menu, index) => (
          <div
            key={menu.productId}
            className={renderClassName(index)}
            {...(mode === "EDITOR" ? {...(isTouch ? touchProps(index) : dropProps(index))} : {})}
          >
            {menu.productName}
            <span className="text-gray-500" style={{
              fontSize: fontSize - 4 + 'px'
            }}>
              {(menu.salePrice || 0).toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
