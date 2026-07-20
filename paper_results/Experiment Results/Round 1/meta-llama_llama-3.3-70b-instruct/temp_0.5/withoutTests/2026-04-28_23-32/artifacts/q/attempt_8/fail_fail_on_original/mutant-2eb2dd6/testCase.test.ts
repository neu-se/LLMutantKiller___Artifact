import { Q } from "../q.js";

describe("Q", () => {
  it("should calculate the sum of an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const sum = Q(array).then((value: number[]) => {
      let total = 0;
      for (let i = 0; i < value.length; i++) {
        total += value[i];
      }
      return total;
    });
    expect(sum).resolves.toBe(15);
  });
});