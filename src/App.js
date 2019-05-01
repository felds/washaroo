import React, { useState } from "react";
import uuid from "uuid/v4";

/**
 * @param {List} list
 */
const item = list_id => ({
  id: uuid(),
  title: `Nova lista criada em ${Date()}`,
  list_id
});

const list = () => ({
  id: uuid()
});

const l1 = list();
const l2 = list();
const l3 = list();
const initialData = {
  lists: [l1, l2, l3],
  items: [item(l2.id), item(l1.id), item(l1.id), item(l1.id)]
};

function List({ list }) {
  return (
    <>
      <p className="list">
        {list.title}
        <br />
        <small>id: {list.id}</small>
      </p>
    </>
  );
}

function Lists({ lists }) {
  return (
    <>
      <h3>Listas:</h3>
      {lists.map(list => (
        <List key={list.id} list={list} />
      ))}
    </>
  );
}

function App() {
  const [lists, setLists] = useState([]);

  return (
    <>
      <h1>Olar</h1>`
    </>
  );
}

export default App;
