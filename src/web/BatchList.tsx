import React, { MouseEventHandler } from "react";
import { sum } from "../utils/math";
import { batch, item } from "../model";

type BatchParams = {
  batch: batch;
  items: item[];
  select: MouseEventHandler;
};
function BatchListItem({ batch, items, select }: BatchParams) {
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

type BatchListParams = {
  batches: batch[];
  items: item[];
  createBatch: MouseEventHandler;
  selectBatch: Function;
};
export default function BatchList({
  batches,
  items,
  createBatch,
  selectBatch,
}: BatchListParams) {
  const select = (batch: batch) => () => selectBatch(batch);

  return (
    <div className="batch-list">
      <h1 className="batch-list__title">Lotes</h1>
      {batches.map(b => (
        <BatchListItem
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
    </div>
  );
}
