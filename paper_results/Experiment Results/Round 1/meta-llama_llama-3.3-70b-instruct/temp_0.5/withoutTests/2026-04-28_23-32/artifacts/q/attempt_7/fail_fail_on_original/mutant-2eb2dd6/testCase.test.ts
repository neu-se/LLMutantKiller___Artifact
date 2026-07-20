import { Q } from "./q";

describe("Q", () => {
  it("should calculate the sum of an array correctly", () => {
    const array = [1, 2, 3, 4, 5];
    const sum = Q.all(array).then((values: number[]) => {
      let total = 0;
      for (let i = 0; i < values.length; i++) {
        total += values[i];
      }
      return total;
    });
    expect(sum).resolves.toBe(15);
  });
});