import { Q } from "../../../q";

describe("Q", () => {
  it("should reduce an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const promise = Q(array_reduce)(array, (a: number, b: number) => a + b, 0);
    return expect(promise).resolves.toBe(15);
  });
});