import { Q } from "./q.js";

describe("Q.fapply", () => {
  it("should pass arguments correctly when applying a function", async () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    const args = [2, 3];
    const result = await Q.fapply(testFn, args);
    expect(result).toBe(5);
    expect(testFn).toHaveBeenCalledWith(2, 3);
  });
});