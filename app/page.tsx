import PortfolioContent from "./components/PortfolioContent";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.page}>
      <PortfolioContent />
    </main>
  );
}
