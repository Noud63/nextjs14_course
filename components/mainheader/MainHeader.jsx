import Link from 'next/link'
import logoImg from "@/assets/logo.png"
import Image from 'next/image'
import styles from "./MainHeader.module.css"
import React from 'react'
import MainHeaderBackground from './MainHeaderBackground'
import NavLink from './NavLink'

const MainHeader = () => {

  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={logoImg} alt="logo" priority />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader
