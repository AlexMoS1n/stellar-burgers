import { FC, ReactNode } from 'react';
import styles from './page-show-component.module.css';

interface PageShowComponentProps {
  children: ReactNode;
  title: string;
}

export const PageShowComponent: FC<PageShowComponentProps> = ({
  title,
  children
}) => (
  <div className={styles.wrapper}>
    <h1 className={'text text_type_main-large'}>{title}</h1>
    {children}
  </div>
);
