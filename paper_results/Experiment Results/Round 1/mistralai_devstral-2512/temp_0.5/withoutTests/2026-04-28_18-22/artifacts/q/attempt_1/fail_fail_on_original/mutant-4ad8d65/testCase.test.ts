import { Q } from "./q";

describe("Q.try mutation test", () => {
  it("should correctly apply a function with arguments", () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    return Q["try"](testFn, 2, 3).then((result) => {
      expect(result).toBe(5);
      expect(testFn).toHaveBeenCalledWith(2, 3);
    });
  });
});