import { type Account, AccountService } from "@/stores/account/types";
import { Menu } from "@/services/shared/Menu";

export async function getMenu <T extends Account> (account: Account, date: Date): Promise<Menu | null> {
  switch (account.service) {
    case AccountService.Pronote: {
      const { getMenu } = await import("./pronote/menu");
      const menu = await getMenu(account, date);

      return {
        date: date,
        lunch: menu.lunch,
        dinner: menu.dinner
      };
    }
    case AccountService.ClicEtMiam: {
      const { getMenu } = await import("./clicetmiam/menu");
      const dishes = await getMenu(account, date);

      const dishConverter = (el: string) => {
        return {
          name: el,
          labels: [],
          allergens: []
        }
      };

      return {
        date: date,
        lunch: {
          entry: dishes.entry.map(dishConverter),
          side: dishes.side.map(dishConverter),
          main: dishes.main.map(dishConverter),
          fromage: dishes.dairy.map(dishConverter),
          dessert: dishes.dessert.map(dishConverter)
        },
        dinner: undefined
      };
    }
    default: {
      return null;
    }
  }
}