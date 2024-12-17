import { MenuProvider } from "@/context/menu";
import Category from "@/features/Category";
import Header from "@/features/Header";
import Menus from "@/features/Menus";
import { getFontSize, getMenus } from "@/util/getMenus";
import React from "react";

export default async function Menu() {
  const menus = await getMenus();
  const fontSize = await getFontSize();
  return (
    <MenuProvider menus={menus} fontSize={fontSize}>
      <Header />
      <Category />
      <Menus />
    </MenuProvider>
  );
}
