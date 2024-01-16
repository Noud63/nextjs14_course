"use server"

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

const isInvalidInput = (input) => {
    return !input || input.trim() === ""
}

const shareMeal = async (prevState, formData) => {

   const meal = {
     title: formData.get("title"),
     summary: formData.get("summary"),
     instructions: formData.get("instructions"),
     image: formData.get("image"),
     creator: formData.get("name"),
     creator_email: formData.get("email"),
   };

   if (
     isInvalidInput(meal.title) ||
     isInvalidInput(meal.summary) ||
     isInvalidInput(meal.instructions) ||
     isInvalidInput(meal.creator) ||
     isInvalidInput(meal.creator_email) ||
     meal.creator_email.includes("@") ||
     !meal.image || meal.image.size === 0
     ) {
        return {
          message: "Invalid Input!"   // use useFormState hook to get message
        }
     }

     await saveMeal(meal);
     redirect("/meals")
 };

 export default shareMeal