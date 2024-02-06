import React ,{ useState } from "react";
import "./App.css";
import { BookToRead } from "./BookToRead";
import BookRow from "./BookRow";

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのうめちゃん",
    authors: "ジミー",
    memo: ""
  },
  {
    id: 2,
    title: "やまだのてほどき入門",
    authors: "ヤミー",
    memo: ""
  },
  {
    id: 3,
    title: "やぎまのちょめちょめ開発",
    authors: "ヒジー",
    memo: ""
  }
];

const App = () => {
  const [books, setBooks] = useState(dummyBooks);
  const handleBookMemoChange = (id: number, memo: string) => {
        const newBooks = books.map((b) => {
          return b.id === id
          ? { ...b, memo: memo } : b;
        });
        setBooks(newBooks);
      }
  const handleBookDelete = (id: number) => {
      const newBooks = books.filter((b) => b.id !== id);
      setBooks(newBooks);
    };
  const bookRows = books.map((b) => {
    return (
      <BookRow
        book={b}
        key={b.id}
        onMemoChange={(id, memo) => {handleBookMemoChange(id, memo)}}
        onDelete={(id) => {handleBookDelete(id);}}//書籍を削除するやつ
      />
    );
  });

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like">本を追加</div>
      </section>
      <section className="main">{bookRows}</section>
    </div>
  );
}
export default App;

