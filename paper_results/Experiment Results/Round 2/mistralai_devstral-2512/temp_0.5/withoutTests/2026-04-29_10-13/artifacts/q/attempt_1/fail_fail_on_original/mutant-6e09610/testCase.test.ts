import { Q } from "./q.js";

describe("Q.thenResolve", () => {
  it("should resolve with the provided value", async () => {
    const value = "test";
    const result = await Q.thenResolve(Q.resolve(), value);
    expect(result).toBe(value);
  });
});