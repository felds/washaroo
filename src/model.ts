import uuid from "uuid/v4";

export type batch = {
  id: string;
  title: string;
};

export type item = {
  id: string;
  title: string;
  count: number;
  batch_id: string;
};

export const batch = (title?: string): batch => ({
  id: uuid(),
  title: title || `Nova lista criada em ${Date()}`,
});

export const item = (batch: batch, title?: string): item => ({
  batch_id: batch.id,
  id: uuid(),
  title: title || "Novo item",
  count: 1,
});
