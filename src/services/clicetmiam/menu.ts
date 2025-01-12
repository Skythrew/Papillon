import { ClicEtMiamAccount } from "@/stores/account/types";
import clicetmiam, { Dishes } from "clicetmiam-api";

export const getMenu = async (account: ClicEtMiamAccount, date: Date): Promise<Dishes> => {
  const menus = await clicetmiam.getMenus(account.authentication.session, account.favoriteSchool);
  
  const dishes = await clicetmiam.getMenuDishes(account.authentication.session, menus[0], date);

  return dishes;
};
