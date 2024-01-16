import fs from "node:fs"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const db = sql('meals.db')

const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // throw new Error("Loading meals failed")
     return db.prepare("SELECT * FROM meals").all(); // all() is for fetching, run() for inserting or changing data, get() for one element
}

export default getMeals

export const getMeal = (slug) => {    // Store file and data in the database
     return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export const saveMeal = async(meal) => {
                                                       // new meal object has no slug property, so use the title to create a slug
     meal.slug = slugify(meal.title, { lower: true })  // replaces spaces with a dash and set to lowercase, this creates the slug
     meal.instructions = xss(meal.instructions)

     const extension = meal.image.name.split(".").pop()
     const fileName = `${meal.slug}.${extension}`

     const stream = fs.createWriteStream(`public/images/${fileName}`)
     const bufferedImage = await meal.image.arrayBuffer()

     stream.write(Buffer.from(bufferedImage), (error) => {
           if(error){
               throw new Error("Saving image failed!")
           }
     })

     meal.image = `/images/${fileName}`;

     db.prepare(`
     INSERT INTO meals
     (slug, title, image, summary, instructions, creator, creator_email)
     VALUES (
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
     )
     `).run(meal);
}