import { ClicEtMiamAccount } from "@/stores/account/types";
import { ErrorServiceUnauthenticated } from "../shared/errors";
import clickandmeow, { Menu, Dishes } from "clicetmiam-api";

export const getMenu = async (account: ClicEtMiamAccount, date: Date): Promise<Dishes> => {
  if (!account.instance) {
    throw new ErrorServiceUnauthenticated("clicetmiam");
  }

  const menus = await clickandmeow.getMenus(account.authentication.session, account.favoriteSchool);

  const dishes = await clickandmeow.getMenuDishes(account.instance, menus[0], date);

  return dishes;
};
