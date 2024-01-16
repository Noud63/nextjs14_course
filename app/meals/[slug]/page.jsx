// localhost:3000/meals/something = (slug)
import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

const MealDetailsPage = ({params}) => {  // every page.jsx recieves a params prop
  console.log(params)
  const meal = getMeal(params.slug)
  console.log(meal)

  if(!meal) {
      notFound()
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />')

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill sizes="80vw"/>
          {/*fill, if you don't know the dimensions of the image*/}
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            By <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <div className={styles.summary}>
            Summary:
            <p>{meal.summary}</p>
            </div>
        </div>
      </header>
      <main className={styles.main}>
        <p className={styles.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}></p>
      </main>
    </>
  );
}

export default MealDetailsPage
