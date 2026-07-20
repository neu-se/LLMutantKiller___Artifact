import { Q } from "./q";

describe("Q.nfapply", () => {
  it("should resolve with the result of applying the function with the given arguments", async () => {
    const testFn = jest.fn((a: number, b: number, callback: (err: any, result: number) => void) => {
      callback(null, a + b);
    });

    const result = await Q.nfapply(testFn, [2, 3]);
    expect(result).toBe(5);
    expect(testFn).toHaveBeenCalledWith(2, 3, expect.any(Function));
  });
});