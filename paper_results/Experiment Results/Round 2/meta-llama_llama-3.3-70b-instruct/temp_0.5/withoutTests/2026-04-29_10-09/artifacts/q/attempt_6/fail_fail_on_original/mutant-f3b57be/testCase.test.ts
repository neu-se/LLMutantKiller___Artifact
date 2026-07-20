import { Q } from "../../../q";

describe("Q", () => {
  it("should handle an array with a single element correctly", () => {
    const array = [1];
    const result = Q.nfcall(array_reduce, array, (a, b) => a + b);
    return expect(result).resolves.toBe(1);
  });

  it("should handle an empty array correctly", () => {
    const array: number[] = [];
    const result = Q.nfcall(array_reduce, array, (a, b) => a + b);
    return expect(result).rejects.toThrow(TypeError);
  });
});