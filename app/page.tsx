import PortfolioPage from "@/app/components/layout/PortfolioPage/PortfolioPage";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <PortfolioPage />
    </main>
  );
}
