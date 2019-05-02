import React, { useState, useRef } from "react";
import uuid from "uuid/v4";
import { head } from "./utils/list";
import { sum } from "./utils/math";

const batch = () => ({
  id: uuid(),
  title: `Nova lista criada em ${Date()}`,
});

const item = (batch, title = "Novo item") => ({
  batch_id: batch.id,
  id: uuid(),
  title,
  count: 1,
});

const b1 = batch();
const b2 = batch();
const b3 = batch();
const initialData = {
  batches: [b1, b2, b3],
  items: [item(b2), item(b1), item(b1), item(b1)],
};

function Batch({ batch, items, select }) {
  return (
    <>
      <p className="batch" onClick={select}>
        {batch.title}
        <br />
        <small>id: {batch.id}</small>
        <br />
        {sum(items.map(i => i.count))} itens
      </p>
    </>
  );
}

function Batches({ batches, items, createBatch, selectBatch }) {
  const select = batch => () => selectBatch(batch);

  return (
    <>
      <h3>Lotes:</h3>
      {batches.map(b => (
        <Batch
          key={b.id}
          batch={b}
          items={items.filter(i => i.batch_id === b.id)}
          select={select(b)}
        />
      ))}
      <p>
        <button type="button" onClick={createBatch}>
          Novo lote
        </button>
      </p>
    </>
  );
}

function ListView({ batch, items, unselect, incItem, decItem, addItem }) {
  const [newItem, setNewItem] = useState("");

  const addNewItem = () => {
    console.log(`Adicionando ${newItem}`);
    console.log(addItem);

    addItem(newItem);
    setNewItem("");
  };

  return (
    <>
      <h1>Lote: {batch.title}</h1>
      <table>
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Qtd</th>
            <th scope="col">Name</th>
            <th scope="col" />
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
        <input
          type="text"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addNewItem()}
        />
      </p>
    </>
  );
}

function App() {
  // hooks
  const [batches, setBatches] = useState(initialData.batches);
  const [items, setItems] = useState(initialData.items);
  const [selectedBatchId, selectBatchId] = useState();

  // utility definitions
  const selectedBatch = head(batches.filter(b => b.id === selectedBatchId));

  // utility functions
  const createBatch = () => setBatches([...batches, batch()]);
  const selectBatch = batch => selectBatchId(batch.id);
  const unselectBatch = () => selectBatchId();
  const incItem = item =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count + 1 } : i)),
    );
  const decItem = item =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count - 1 } : i)),
    );
  const removeItem = item => setItems(items.filter(i => i.id !== item.id));
  // const addItem = (batch, title) => setItems([...items, item(batch, title)]);
  const addItem = batch => title => {
    console.log("Adicionando", batch, title);
    setItems([...items, item(batch, title)]);
  };

  return (
    <>
      {selectedBatch ? (
        <ListView
          batch={selectedBatch}
          items={items.filter(i => i.batch_id === selectedBatch.id)}
          unselect={unselectBatch}
          incItem={incItem}
          decItem={decItem}
          removeItem={removeItem}
          addItem={addItem(selectedBatch)}
        />
      ) : (
        <Batches
          batches={batches}
          items={items}
          createBatch={createBatch}
          selectBatch={selectBatch}
        />
      )}

      <DBG {...{ selectedBatchId, batches, items }} />
    </>
  );
}

function DBG(data) {
  return <pre>{JSON.stringify(data, null, 4)}</pre>;
}

export default App;
