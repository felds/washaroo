import React, { useState } from "react";
import { batch, item } from "../model";
import { sum } from "../utils/math";

type BatchViewParams = {
  batch: batch;
  items: item[];
  decItem: Function;
  incItem: Function;
  unselect: Function;
  addNewItem: Function;
};
export default function BatchView({
  batch,
  items,
  decItem,
  incItem,
  unselect,
  addNewItem,
}: BatchViewParams) {
  const [newItem, setNewItem] = useState("");

  return (
    <div className="batch-view">
      <h1 className="batch-view__title">Lote: {batch.title}</h1>

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
      <p onClick={() => unselect()}>&larr; Voltar</p>
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
    </div>
  );
}
