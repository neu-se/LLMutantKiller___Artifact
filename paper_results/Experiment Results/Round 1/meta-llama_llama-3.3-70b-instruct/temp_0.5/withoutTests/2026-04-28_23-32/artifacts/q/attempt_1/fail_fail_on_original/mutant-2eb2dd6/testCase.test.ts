import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should calculate the sum of an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const sum = array_reduce(array, (acc, current) => acc + current, 0);
    expect(sum).toBe(15);
  });
});