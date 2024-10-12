import { FC, PropsWithChildren } from "react";

import { Header } from "./Header";

import styles from "./layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer} />
    </div>
  );
};
