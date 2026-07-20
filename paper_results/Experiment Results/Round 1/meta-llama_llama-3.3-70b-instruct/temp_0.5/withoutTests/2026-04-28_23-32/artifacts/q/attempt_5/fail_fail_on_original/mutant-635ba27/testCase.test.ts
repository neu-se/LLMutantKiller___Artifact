import { Q } from "./q.js";

describe("Q", () => {
  it("should return the correct index of an element in an array", () => {
    const array = [1, 2, 3, 4, 5];
    const index = Q(array).dispatch("indexOf", [3]);
    expect(index).resolves.toBe(2);
  });
});