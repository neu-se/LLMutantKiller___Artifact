import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should return the correct index of an element in an array", () => {
    const array = [1, 2, 3, 4, 5];
    const index = Q(array).dispatch("indexOf", [3]);
    expect(index).resolves.toBe(2);
  });

  it("should return -1 for an element that is not in the array", () => {
    const array = [1, 2, 3, 4, 5];
    const index = Q(array).dispatch("indexOf", [6]);
    expect(index).resolves.toBe(-1);
  });
});