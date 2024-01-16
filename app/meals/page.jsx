import React, { Suspense } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import MealsGrid from "@/components/meals/MealsGrid";
import getMeals from "@/lib/meals";

const Meals = async() => {
const meals = await getMeals()
return <MealsGrid meals={meals} />;
}

const MealsPage = () => {

  return (
    <>
      <header className={styles.header}>
        <h1>
          Deliocious meals, created{" "}
          <span className={styles.highLight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
