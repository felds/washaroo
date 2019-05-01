import React, { useState } from "react";
import uuid from "uuid/v4";

const head = xs => xs[0];

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

function Lists({ lists, items, createList, selectList }) {
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
      </p>
    </>
  );
}

function ListView({ list, items, unselect }) {
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
                <button>-</button>
              </td>
              <td>{i.count}</td>
              <td>{i.title}</td>
              <td>
                <button>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p onClick={unselect}>&larr; Voltar</p>
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

  return (
    <>
      {selectedList ? (
        <ListView
          list={selectedList}
          items={items.filter(i => i.list_id === selectedList.id)}
          unselect={unselectList}
        />
      ) : (
        <Lists lists={lists} items={items} createList={createList} selectList={selectList} />
      )}

      <DBG {...{ selectedListId, lists, items }} />
    </>
  );
}

function DBG(data) {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default App;
