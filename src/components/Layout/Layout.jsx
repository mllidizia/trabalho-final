import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";
import { Footer } from "../Footer/Footer";

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
