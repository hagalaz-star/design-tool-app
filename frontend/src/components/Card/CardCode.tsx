import { CardOptions } from "@/types";

export function generateCardCode(options: CardOptions) {
  return `
import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export default function Card({ 
  title = "${options.title || "카드 제목"}", 
  description = "${options.description || "카드 설명을 입력하세요."}",
  imageUrl = "${options.imageUrl || ""}"
}: CardProps) {
  return (
    <div className={styles.card}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
  `;
}
