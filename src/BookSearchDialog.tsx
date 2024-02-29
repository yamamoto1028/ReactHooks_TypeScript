import React, { useState, useEffect } from "react";
import { BookDescription } from "./BookDescription";
import BookSearchItem from "./BookSearchItem";

function buildSearchUrl(title: string, author: string, maxResults: number): string {
  let url = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = []
  if (title) {
    conditions.push(`intitle:${title}`);
  }
  if (author) {
    conditions.push(`inauthor:${author}`);
  }
  return url + conditions.join('+') + `&maxResults=${maxResults}`;
}
interface VolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: {
    smallThumbnail: string;
  };
}

interface Item {
  volumeInfo: VolumeInfo;
}

function extractBooks(json: {items: Item[]}): BookDescription[] {
  const items: Item[] = json.items;
  return items.map((item: Item) => {
    const volumeInfo: VolumeInfo = item.volumeInfo;
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : "",
      thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
    }
  });
}

type BookSearchDialogProps = {
  maxResults: number;//検索結果の表示最大件数
  onBookAdd: (book: BookDescription) => void;//書籍追加イベントを拾うコールバック関数
};

//コンポーネント本体の関数を定義
//useState変数を使ってステート変数を定義
const BookSearchDialog = (props: BookSearchDialogProps) => {
  const [books, setBooks] = useState([] as BookDescription[]);//書籍の検索結果を表す配列
  const [title, setTitle] = useState("");//検索条件のタイトル（初期値は空の文字列）
  const [author, setAuthor] = useState("");//検索結果の著者名（初期値は空の文字列）
  const [isSearching, setIsSearching] = useState(false);

//副作用の実装
useEffect(() => {
  if (isSearching) {
    const url = buildSearchUrl(title, author, props.maxResults);
    fetch(url)
      .then(res => res.json())
      .then(json => {
        const books = extractBooks(json);
        setBooks(books);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }
}, [isSearching, title, author, props.maxResults]);

  //イベントハンドラのコールバック関数
  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  //検索ボタンのクリックイベントをハンドリングするコールバックの定義
  const handleSearchClick = () => {
    if (!title && !author) {
      alert("条件を入力してください");
      return;
    }
    setIsSearching(true);
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
            onChange={handleTitleInputChange}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            onChange={handleAuthorInputChange}
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