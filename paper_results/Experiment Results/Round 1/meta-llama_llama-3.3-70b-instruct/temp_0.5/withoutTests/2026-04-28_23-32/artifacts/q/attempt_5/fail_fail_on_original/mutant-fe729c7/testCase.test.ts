import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should work correctly with array_reduce", () => {
    const array = [1, 2, 3];
    const callback = (basis: number, value: number) => basis + value;
    const basis = 0;
    const arrayReduce = Q(array_reduce);
    const result = arrayReduce(array, callback, basis);
    expect(result).toBe(6);
  });
});