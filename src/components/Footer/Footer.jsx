import { BsGithub } from "react-icons/bs";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.dir}>
            2025, Painel Administrativo - Biblioteca- Todos os direitos
            reservados
          </p>
          <div className={styles.links}>
            <a
              className={styles.githubLink}
              href="https://github.com/mllidizia/trabalho-final "
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsGithub />
              Renan Neves/ Caique Caetano/ Luiza Lidizia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
