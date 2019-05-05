import React, { useState } from "react";
import { batch, item } from "../model";
import { head } from "../utils/list";
import BatchList from "./BatchList";
import _DBG from "./_DGB";
import BatchView from "./BatchView";

const b1 = batch();
const b2 = batch();
const b3 = batch();
const initialData = {
  batches: [b1, b2, b3],
  items: [item(b2), item(b1), item(b1), item(b1)],
};

function App() {
  // hooks
  const [batches, setBatches] = useState(initialData.batches);
  const [items, setItems] = useState(initialData.items);
  const [selectedBatchId, selectBatchId] = useState();

  // utility definitions
  const selectedBatch = head(batches.filter(b => b.id === selectedBatchId));

  // utility functions
  const createBatch = () => setBatches([...batches, batch()]);
  const selectBatch = (batch: batch) => selectBatchId(batch.id);
  const unselectBatch = () => selectBatchId(undefined);
  const incItem = (item: item) =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count + 1 } : i)),
    );
  const decItem = (item: item) =>
    setItems(
      items.map(i => (i.id === item.id ? { ...i, count: i.count - 1 } : i)),
    );
  const removeItem = (item: item) =>
    setItems(items.filter(i => i.id !== item.id));
  const addItem = (batch: batch) => (title: string) =>
    setItems([...items, item(batch, title)]);

  return (
    <div className="app">
      {selectedBatch ? (
        <BatchView batch={selectedBatch} />
      ) : (
        <BatchList
          batches={batches}
          items={items}
          createBatch={createBatch}
          selectBatch={selectBatch}
        />
      )}

      <_DBG data={{ batches, items, selectedBatch }} />
    </div>
  );
}

export default App;
