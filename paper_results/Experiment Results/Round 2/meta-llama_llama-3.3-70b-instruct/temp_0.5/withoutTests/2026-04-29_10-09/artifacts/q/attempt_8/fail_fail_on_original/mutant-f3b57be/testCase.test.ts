import { Q } from "../../../q";

describe("Q", () => {
  it("should handle an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const result = Q.nfcall(array_reduce, array, (a: number, b: number) => a + b, 0);
    return expect(result).resolves.toBe(15);
  });

  it("should handle an empty array correctly", () => {
    const array: number[] = [];
    const result = Q.nfcall(array_reduce, array, (a: number, b: number) => a + b, 0);
    return expect(result).rejects.toThrowError();
  });
});