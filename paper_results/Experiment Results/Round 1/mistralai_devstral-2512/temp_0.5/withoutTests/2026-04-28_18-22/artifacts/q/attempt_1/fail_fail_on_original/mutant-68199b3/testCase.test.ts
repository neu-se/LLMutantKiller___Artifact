import { Q } from "./q";

describe("Q.fcall mutation test", () => {
  it("should correctly call a function with arguments using fcall", () => {
    const testFn = jest.fn((a: number, b: number) => a + b);
    const promise = Q.fcall(testFn, 2, 3);
    return promise.then((result) => {
      expect(result).toBe(5);
      expect(testFn).toHaveBeenCalledWith(2, 3);
    });
  });
});