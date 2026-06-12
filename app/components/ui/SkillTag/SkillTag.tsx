import styles from "./SkillTag.module.scss";

interface SkillTagProps {
  label: string;
}

export default function SkillTag({ label }: SkillTagProps) {
  return <span className={styles.tag}>{label}</span>;
}
