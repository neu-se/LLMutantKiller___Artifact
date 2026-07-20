import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should reduce an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const promise = Q(array_reduce)(array, (a, b) => a + b, 0);
    return expect(promise).resolves.toBe(15);
  });
});