import React, { useState, useRef } from "react";
import uuid from "uuid/v4";
import { head } from "./utils/list";
import { sum } from "./utils/math";

const list = () => ({
  id: uuid(),
  title: `Nova lista criada em ${Date()}`,
});

const item = (list, title = "Novo item") => ({
  list_id: list.id,
  id: uuid(),
  title,
  count: 1,
});

const l1 = list();
const l2 = list();
const l3 = list();
const initialData = {
  lists: [l1, l2, l3],
  items: [item(l2), item(l1), item(l1), item(l1)],
};

function List({ list, items, select }) {
  return (
    <>
      <p className="list" onClick={select}>
        {list.title}
        <br />
        <small>id: {list.id}</small>
        <br />
        {sum(items.map(i => i.count))} itens
      </p>
    </>
  );
}

function Lists({ lists, items, createList, selectList }) {
  const select = list => () => selectList(list);

  return (
    <>
      <h3>Listas:</h3>
      {lists.map(l => (
        <List
          key={l.id}
          list={l}
          items={items.filter(i => i.list_id === l.id)}
          select={select(l)}
        />
      ))}
      <p>
        <button type="button" onClick={createList}>
          Nova lista
        </button>
      </p>
    </>
  );
}

function ListView({ list, items, unselect, incItem, decItem, addItem }) {
  const input = useRef();

  const add = e => {
    e.preventDefault();
    addItem(list, input.current.value);
    input.current.value = "";
  };

  return (
    <>
      <h1>Lista: {list.title}</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Qtd</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map(i => (
            <tr key={i.id}>
              <td>
                <button onClick={() => decItem(i)}>-</button>
              </td>
              <td>{i.count}</td>
              <td>{i.title}</td>
              <td>
                <button onClick={() => incItem(i)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p onClick={unselect}>&larr; Voltar</p>
      <p>
        <small>Total: {sum(items.map(i => i.count))}</small>
      </p>
      <p>
        <form onSubmit={add}>
          <input type="text" ref={input} />
          <button>criar</button>
        </form>
      </p>
    </>
  );
}

function App() {
  // hooks
  const [lists, setLists] = useState(initialData.lists);
  const [items, setItems] = useState(initialData.items);
  const [selectedListId, selectListId] = useState();

  // utility definitions
  const selectedList = head(lists.filter(l => l.id === selectedListId));

  // utility functions
  const createList = () => setLists([...lists, list()]);
  const selectList = list => selectListId(list.id);
  const unselectList = () => selectListId();
  const incItem = item =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count + 1 } : i)),
    );
  const decItem = item =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count - 1 } : i)),
    );
  const removeItem = item => setItems(items.filter(i => i.id !== item.id));
  const addItem = (list, title) => setItems([...items, item(list, title)]);

  return (
    <>
      {selectedList ? (
        <ListView
          list={selectedList}
          items={items.filter(i => i.list_id === selectedList.id)}
          unselect={unselectList}
          incItem={incItem}
          decItem={decItem}
          removeItem={removeItem}
          addItem={addItem}
        />
      ) : (
        <Lists
          lists={lists}
          items={items}
          createList={createList}
          selectList={selectList}
        />
      )}

      <DBG {...{ selectedListId, lists, items }} />
    </>
  );
}

function DBG(data) {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default App;
