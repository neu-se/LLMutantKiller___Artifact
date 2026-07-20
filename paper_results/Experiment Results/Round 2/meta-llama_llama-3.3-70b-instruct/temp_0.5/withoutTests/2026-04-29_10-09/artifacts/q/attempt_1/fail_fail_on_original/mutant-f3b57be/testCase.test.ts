import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
  it("should reduce an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const sum = Q(array).then((arr) => {
      return arr.reduce((a, b) => a + b, 0);
    });
    return expect(sum).resolves.toBe(15);
  });
});