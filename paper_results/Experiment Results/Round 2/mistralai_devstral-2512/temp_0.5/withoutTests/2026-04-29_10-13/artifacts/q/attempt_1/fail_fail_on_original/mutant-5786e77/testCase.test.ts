import { Q } from "./q";

describe("Promise.spread", () => {
  it("should spread array values as arguments to the fulfilled callback", async () => {
    const promise = Q.resolve([1, 2, 3]);
    const result = await promise.spread((a: number, b: number, c: number) => {
      return a + b + c;
    });
    expect(result).toBe(6);
  });
});