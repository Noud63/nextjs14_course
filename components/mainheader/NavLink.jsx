"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./NavLink.module.css"

const navLink = ({href, children}) => {

    const path = usePathname()
  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${styles.active} ${styles.link}` : styles.link}
    >
      {children}
    </Link>
  );
}

export default navLink
