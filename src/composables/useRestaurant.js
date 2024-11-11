import { ref } from "vue";
import restaurantService from "@/api/restaurantService";

export async function useRestaurant(restaurantId) {
  const restaurant = ref({});
  const numberOfPages = ref(0);

  const getRestaurant = async () => {
    const data = await restaurantService.getRestaurant(restaurantId);
    restaurant.value = data;

    cleanUpTelForHref();
    cleanUpOpeningHours();
  };

  const getRestaurantVisitsNumberOfPages = async () => {
    const data = await restaurantService.getRestaurantVisits(restaurantId, 1);
    numberOfPages.value = Math.ceil(data.total / 10) - 1;
  };

  const cleanUpTelForHref = () => {
    let newTel = restaurant.value.tel;
    newTel = newTel.replace(")", "");
    newTel = newTel.replace("(", "");
    newTel = newTel.replace("-", "");
    newTel = newTel.replace(" ", "");
    newTel = "+1" + newTel;

    restaurant.value.cleanedTel = newTel;
  };

  const cleanUpOpeningHours = () => {
    let frenchOpeningHours = {};
    let openingHours = restaurant.value.opening_hours;

    for (let key in openingHours) {
      let hours;

      if (openingHours[key]) {
        hours = openingHours[key].replace("-", " à ");
      } else {
        hours = "Fermé";
      }

      switch (key) {
        case "monday":
          key = "lundi";
          break;
        case "tuesday":
          key = "mardi";
          break;
        case "wednesday":
          key = "mercredi";
          break;
        case "thursday":
          key = "jeudi";
          break;
        case "friday":
          key = "vendredi";
          break;
        case "saturday":
          key = "samedi";
          break;
        case "sunday":
          key = "dimanche";
          break;
        default:
          key = "aucun";
          break;
      }

      frenchOpeningHours[key] = hours;
    }

    restaurant.value.opening_hours = frenchOpeningHours;
  };

  await getRestaurant();
  await getRestaurantVisitsNumberOfPages();

  return { restaurant, numberOfPages };
}
