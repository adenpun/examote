import type { Adapter, Item } from "./adapter";

type JSONAdapterSchema = {
  password: string | null;
  items: Record<string, Item>;
  version: number;
};

export class JSONAdapter implements Adapter {
  private data: JSONAdapterSchema = {
    password: null,
    items: {},
    version: 1,
  };

  public async getItem(id: string): Promise<Item | null> {
    return this.data.items[id] ?? null;
  }

  public async addItem(item: Item): Promise<void> {
    if (!this.data.items[item.id]) {
      this.data.items[item.id] = item;
    }
  }

  public async setItem<T extends keyof Item>(
    id: string,
    key: T,
    value: Item[T],
  ): Promise<void>;
  public async setItem(id: string, value: Item): Promise<void>;
  public async setItem<T extends keyof Item>(
    id: string,
    key: T | Item,
    value?: Item[T],
  ): Promise<void> {
    if (typeof key === "string" && value) {
      this.data.items[id][key] = value;
    } else if (typeof key === "object") {
      this.data.items[id] = key;
    }
  }

  public async removeItem(id: string): Promise<void> {
    delete this.data.items[id];
  }

  public async listItemId(): Promise<string[]> {
    return Object.keys(this.data.items);
  }

  public async doesItemExist(id: string): Promise<boolean> {
    return !!this.data.items[id];
  }

  public async setHashedPassword(password: string | null): Promise<void> {
    this.data.password = password;
  }

  public async getHashedPassword(): Promise<string | null> {
    return this.data.password;
  }
}
