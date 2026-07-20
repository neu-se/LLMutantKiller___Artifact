import { async } from "./q.js";

describe("async generator function", () => {
  it("should correctly handle generator with 'next' verb", async () => {
    const result = await async(function* () {
      const value = yield Promise.resolve(42);
      return value;
    })();

    expect(result).toBe(42);
  });
});