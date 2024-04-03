import React, { useState, useRef } from "react";
import { BookDescription } from './BookDescription'
import BookSearchItem from "./BookSearchItem";
import { useBookData } from "./useBookData";

type BookSearchDialogProps = {
  maxResults: number;//検索結果の表示最大件数
  onBookAdd: (book: BookDescription) => void;//書籍追加イベントを拾うコールバック関数
};

//コンポーネント本体の関数を定義
//useState変数を使ってステート変数を定義
const BookSearchDialog = (props: BookSearchDialogProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(""); 
  
  const books = useBookData(title, author, props.maxResults);

  //検索ボタンのクリックイベントをハンドリングするコールバックの定義
  const handleSearchClick = () => {
    if (!titleRef.current!.value && !authorRef.current!.value) {
      alert("条件を入力してください");
      return;
    }
    setTitle(titleRef.current!.value);
    setAuthor(authorRef.current!.value);
  };

  //書籍追加イベントに対するコールバック
  //BookSearchItemで発火したイベントを親コンポーネントへ伝搬
  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = books.map((b, idx) => {
    return (
      <BookSearchItem
        description={b}
        onBookAdd={handleBookAdd}
        key={idx}
      />
    );
  });
  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input
            type="text"
            ref={titleRef}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            ref={authorRef}
            placeholder="著者名で検索"
          />
        </div>
        <div className="button-like" onClick={handleSearchClick}>
          検索
        </div>
      </div>
      <div className="search-results">{bookItems}</div>
    </div>
  );
};
export default BookSearchDialog;