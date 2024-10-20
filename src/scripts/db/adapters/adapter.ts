import { z } from "zod";

export type Item = z.infer<typeof itemSchema>;

export const itemSchema = z.object({
  id: z.string(),
  content: z.string(),
});

export abstract class Adapter {
  public abstract getItem(id: string): Promise<Item | null>;

  public abstract addItem(item: Item): Promise<void>;

  public abstract setItem<T extends keyof Item>(
    id: string,
    key: T,
    value: Item[T],
  ): Promise<void>;
  public abstract setItem(id: string, value: Item): Promise<void>;

  public abstract removeItem(id: string): Promise<void>;

  public abstract listItemId(): Promise<string[]>;

  public abstract doesItemExist(id: string): Promise<boolean>;

  public abstract setHashedPassword(password: string | null): Promise<void>;

  public abstract getHashedPassword(): Promise<string | null>;
}
