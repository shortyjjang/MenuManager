import { MenuProvider } from '@/context/menu';
import Category from '@/features/Category';
import Menus from '@/features/Menus';
import { getMenus } from '@/util/getMenus';
import React from 'react'

export default async function Menu() {
    const menus = await getMenus();
  return (<MenuProvider menus={menus}>
      <Category />
      <Menus />
    </MenuProvider>
  );
}
