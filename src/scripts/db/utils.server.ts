import { compare, genSalt, hash } from "bcrypt";

export async function bcryptHash(password: string): Promise<string> {
  return hash(password, await genSalt(10));
}

export async function bcryptCompare(
  password: string,
  hash: string,
): Promise<boolean> {
  return await compare(password, hash);
}
