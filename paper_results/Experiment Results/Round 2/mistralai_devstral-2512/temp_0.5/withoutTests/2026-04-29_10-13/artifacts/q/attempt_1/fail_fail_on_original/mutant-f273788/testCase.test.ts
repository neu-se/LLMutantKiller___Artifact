import { Q } from "./q";

describe("Q.fapply", () => {
  it("should pass arguments correctly to the function", async () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    const result = await Q.fapply(testFn, [2, 3]);
    expect(result).toBe(5);
  });
});