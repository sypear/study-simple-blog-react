import { useState } from 'react';
import './App.css';

function App() {
  const [post, setPost] = useState([
    {title: "한강 피크닉", date: "2022-07-22", like: 0},
    {title: "영종도 바다뷰 카페 추천!", date: "2022-07-22", like: 0},
    {title: "스타벅스 신메뉴 먹어보기", date: "2022-07-22", like: 0},
    {title: "강남 타코 맛집", date: "2022-07-22", like: 0}
  ]);
  const [modalFlag, setModalFlag] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [targetIdx, setTargetIdx] = useState(0);

  function addPost() {
    let copyPost = [...post];
    copyPost.unshift({title: newTitle, date: "2022-07-22", like: 0});
    setPost(copyPost);
  }

  function deletePost(idx) {
    let copyPost = [...post];
    copyPost.splice(idx, 1);
    setPost(copyPost);

    setModalFlag(false);
  }

  function addLike(idx) {
    let copyPost = [...post];
    copyPost[idx].like++;
    setPost(copyPost);
  }

  function modalOnOff(idx) {
    let targetNewIdx = idx;

    if (targetIdx !== targetNewIdx) {
      setTargetIdx(idx);
    }

    if (modalFlag === true && targetIdx !== targetNewIdx) {
      setModalFlag(true);
    } else {
      setModalFlag(!modalFlag);
    }
  }

  function onReset() {
    setNewTitle("");
  }

  function sortAlphabetically() {
    let copyPost = [...post];
    copyPost.sort((a, b) => { return a.title > b.title ? 1 : -1; });
    setPost(copyPost);
  }

  return (
    <div className="App">
      <header>
        <h1 className="logo">
          Sypear Blog
        </h1>
      </header>

      <main>
        <div className="post-wrapper">
        {
          post.map((item, idx) => {
            return (
              <article className="post" key={idx}>
                <h1 className="post-title" onClick={() => {modalOnOff(idx)}}>{item.title}</h1>
                <span className="post-date">{item.date}</span>
                <span className="post-like white-button" onClick={() => {addLike(idx)}}>
                  ❤️LIKE <strong>{item.like}</strong>
                </span>
                <button type="button" className="post-delete-button black-button" onClick={() => {deletePost(idx)}}>삭제</button>
              </article>
            );
          })
        }
        </div>

        <div className="post-manage-wrapper">
          <div className="post-manage">
            <input className="input-title" type="text" placeholder="등록할 글 제목을 입력해주세요." onChange={(e) => {setNewTitle(e.target.value)}} value={newTitle}></input>
            <button className="black-button" onClick={() => {addPost(); onReset();}}>
              등록
            </button>
          </div>

          <button className="white-button" onClick={() => {sortAlphabetically()}}>
            가나다순 정렬
          </button>
        </div>

        {
          modalFlag === true ? <Content post={post} targetIdx={targetIdx}></Content> : null
        }
      </main>

      <footer>
        <h1 className="project-name">Simple React Blog</h1>
        <span className="project-desc">React 기초 학습을 위한 간단한 블로그 만들기</span>
      </footer>
    </div>
  );
}

function Content(props) {
  return (
    <div className="content-wrapper">
      <article className="content">
        <h1 className="content-title">{props.post[props.targetIdx].title}</h1>
        <span className="content-date">{props.post[props.targetIdx].date}</span>
      </article>
    </div>
  );
}

export default App;
