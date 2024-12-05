"use client";

import { useState, useRef, useEffect } from "react";

export function useMenuManager(menus: Record<string, ((string | number)[] | string | number)>[]) {
  const moveEventRef = useRef<{
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
  }>({
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
  });
  const moveMenuRef = useRef<{
    startIndex: number | null;
    targetIndex: number | null;
  }>({
    startIndex: null,
    targetIndex: null,
  });
  const [targetIndex, setTargetIndex] = useState(0);

  const moveMenuEnd = () => {
    if (
      moveMenuRef.current.startIndex === null ||
      moveMenuRef.current.targetIndex === null
    )
      return;
    const newMenuList = [...menus];
    newMenuList.splice(moveMenuRef.current.startIndex, 1);
    newMenuList.splice(
      moveMenuRef.current.targetIndex,
      0,
      menus[moveMenuRef.current.startIndex]
    );
    moveMenuRef.current.startIndex = null;
    moveMenuRef.current.targetIndex = null;
    if (targetIndex !== 0) setTargetIndex(0);
    return newMenuList;
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (moveMenuRef.current.startIndex === null) return;
      moveEventRef.current.targetX = e.clientX;
      moveEventRef.current.targetY = e.clientY;
    });
  }, []);

  return {
    moveMenuRef,
    targetIndex,
    setTargetIndex,
    moveMenuEnd,
  };
}