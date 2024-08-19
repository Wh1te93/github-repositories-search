import StarIcon from "@mui/icons-material/Star";
import { RepositoryData } from "types";

import styles from "./details.module.scss";

export const Details = ({
  selectedItem,
}: {
  selectedItem: RepositoryData | null;
}) => {
  return (
    <div className={styles.detailsWrapper}>
      {selectedItem ? (
        <div>
          <h3 title={selectedItem.name}>{selectedItem.name}</h3>
          <div className={styles.detailsSection}>
            {selectedItem.language ? (
              <div className={styles.languageLabel}>
                {selectedItem.language}
              </div>
            ) : (
              <div></div>
            )}
            <div className={styles.starsCount}>
              <StarIcon />
              {selectedItem.stargazers_count}
            </div>
          </div>
          {!!selectedItem.topics.length && (
            <div className={styles.topics}>
              {selectedItem.topics.map((topic, index) => (
                <div className={styles.topicLabel} key={index}>
                  {topic}
                </div>
              ))}
            </div>
          )}
          {selectedItem.license && (
            <div className={styles.license}>{selectedItem.license.name}</div>
          )}
        </div>
      ) : (
        <div className={styles.details}>Выберите репозиторий</div>
      )}
    </div>
  );
};
