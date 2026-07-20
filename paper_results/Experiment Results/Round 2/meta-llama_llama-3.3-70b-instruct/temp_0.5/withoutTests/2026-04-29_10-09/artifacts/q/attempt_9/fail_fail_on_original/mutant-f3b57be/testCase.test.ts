import { Q, array_reduce } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should handle an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const result = array_reduce(array, (a: number, b: number) => a + b, 0);
    expect(result).toBe(15);
  });

  it("should handle an array with a single element correctly", () => {
    const array = [1];
    const result = array_reduce(array, (a: number, b: number) => a + b, 0);
    expect(result).toBe(1);
  });

  it("should handle an empty array correctly", () => {
    const array: number[] = [];
    expect(() => array_reduce(array, (a: number, b: number) => a + b, 0)).toThrowError();
  });
});