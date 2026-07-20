import { Q } from "./q";

describe("array_indexOf mutation test", () => {
  it("should correctly find the index of an element in an array", () => {
    const arr = [1, 2, 3, 4, 5];
    const value = 3;
    const result = arr.indexOf(value);
    expect(result).toBe(2);
  });
});