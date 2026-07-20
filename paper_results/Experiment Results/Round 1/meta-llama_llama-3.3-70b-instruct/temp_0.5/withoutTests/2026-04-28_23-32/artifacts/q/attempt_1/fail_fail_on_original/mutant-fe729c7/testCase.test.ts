import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should work correctly with array_reduce", () => {
    const array = [1, 2, 3];
    const callback = jest.fn();
    const basis = 0;
    Q(array_reduce)(array, callback, basis);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});