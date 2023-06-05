import css from './Button.module.css';

export const Button = handleClick => (
  <button type="button" className={css.Button} onClick={handleClick}>
    Load more...
  </button>
);
