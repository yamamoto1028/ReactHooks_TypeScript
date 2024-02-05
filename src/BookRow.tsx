//インポート
import React from "react";
import { BookToRead } from "./BookToRead";

//propsの型を定義する。
type BookRowProps = {
  book: BookToRead;
  onMemoChange: (id: number, memo: string) => void;
  onDelete: (id: number) => void;
};

//BookToRead型の書籍情報(book)のほか、メモ項目の変更イベントのコールバック、書籍削除イベントのコールバックを持たせる。
// そして、関数コンポーネントの本体を定義してエクスポート。
const BookRow = (props: BookRowProps) => {
  const { title, authors, memo } = props.book;

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onMemoChange(props.book.id, e.target.value);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.book.id);
  };

  return (
    <div className="book-row">
      <div title={title} className="title">
        {title}
      </div>
      <div title={authors} className="authors">
        {authors}
      </div>
      <input
        type="text"
        className="memo"
        value={memo}
        onChange={handleMemoChange}
      />
      <div className="delete-row" onClick={handleDeleteClick}>
        削除
      </div>
    </div>
  );
};

export default BookRow;
