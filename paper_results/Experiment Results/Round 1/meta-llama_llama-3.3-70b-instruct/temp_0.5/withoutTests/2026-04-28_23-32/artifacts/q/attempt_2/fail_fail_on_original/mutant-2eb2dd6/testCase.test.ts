import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should calculate the sum of an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const sum = Q(array).reduce((acc, current) => acc + current, 0);
    expect(sum).resolves.toBe(15);
  });
});