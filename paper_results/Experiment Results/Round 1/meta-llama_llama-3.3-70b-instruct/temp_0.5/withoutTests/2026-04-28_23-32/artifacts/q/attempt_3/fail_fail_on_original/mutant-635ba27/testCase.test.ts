import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should return the correct index of an element in an array", () => {
    const array = [1, 2, 3, 4, 5];
    const index = array_indexOf(array, 3);
    expect(index).toBe(2);
  });
});