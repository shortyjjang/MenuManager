import { MenuProvider } from "@/context/menu";
import Category from "@/features/Category";
import Header from "@/features/Header";
import Menus from "@/features/Menus";
import { getMenus } from "@/util/getMenus";
import React from "react";

export default async function Menu() {
  const menus = await getMenus();
  return (
    <MenuProvider menus={menus}>
      <Header />
      <Category />
      <Menus />
    </MenuProvider>
  );
}
