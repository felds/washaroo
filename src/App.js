import React, { useState } from "react";
import uuid from "uuid/v4";

const list = () => ({
  id: uuid(),
  title: `Nova lista criada em ${Date()}`,
});

const item = list_id => ({
  list_id,
  id: uuid(),
  title: `Novo item`,
  count: 1,
});

const l1 = list();
const l2 = list();
const l3 = list();
const initialData = {
  lists: [l1, l2, l3],
  items: [item(l2.id), item(l1.id), item(l1.id), item(l1.id)],
};

function List({ list, items, select }) {
  return (
    <>
      <p className="list" onClick={select}>
        {list.title}
        <br />
        <small>id: {list.id}</small>
        <br />
        {items.length} itens
      </p>
    </>
  );
}

function Lists({ lists, items, createList, selectList, unselectList }) {
  const select = list => () => selectList(list);

  return (
    <>
      <h3>Listas:</h3>
      {lists.map(l => (
        <List key={l.id} list={l} items={items.filter(i => i.list_id === l.id)} select={select(l)} />
      ))}
      <p>
        <button type="button" onClick={createList}>
          Nova lista
        </button>
        <button type="button" onClick={unselectList}>
          Des-selecionar
        </button>
      </p>
    </>
  );
}

function App() {
  const [lists, setLists] = useState(initialData.lists);
  const [items, setItems] = useState(initialData.items);
  const [selectedListId, selectListId] = useState();

  const createList = () => setLists([...lists, list()]);
  const selectList = list => selectListId(list.id);
  const unselectList = () => selectListId();

  return (
    <>
      <Lists lists={lists} items={items} createList={createList} selectList={selectList} unselectList={unselectList} />

      <DBG {...{ selectedListId, lists, items }} />
    </>
  );
}

function DBG(data) {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default App;
