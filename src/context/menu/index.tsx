/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MenuType } from "@/util/getMenus"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import cookieStore from "js-cookie"

interface ContextType {
  selectedCategory: number;
  setSelectedCategory: (selectedCategory: number) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
  menuList: MenuType[];
  setMenuList: (menuList: MenuType[]) => void;
  isTouch: boolean;
  mode:string
  setMode:(mode:string) => void
}

const Context = createContext<ContextType | undefined>(undefined);

/**
 *
 * @constructor
 */
export const useMenu = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("Context must be used within an provider.");
  }
  return context;
};

/**
 * Provider
 * @param children
 * @constructor
 */
export const MenuProvider: React.FC<{ children: ReactNode, menus: MenuType[], fontSize: number }> = ({
  children,
  menus,
  fontSize : size
}) => {
  const [menuList, setMenuList] = useState(menus);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [fontSize, setFontSize] = useState(size);
  const [isTouch, setIsTouch] = useState(false);
  const [mode, setMode] = useState('NORMAL')
  useEffect(() => {
    if (window.navigator.maxTouchPoints > 0) setIsTouch(true);
        if (!cookieStore.get("fontSize")) {
          cookieStore.set("fontSize", String(fontSize));
        }
  }, []);
  return (
    <Context.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        fontSize,
        setFontSize,
        menuList,
        setMenuList,
        isTouch,
        mode,
        setMode
      }}
    >
      {children}
    </Context.Provider>
  );
};
