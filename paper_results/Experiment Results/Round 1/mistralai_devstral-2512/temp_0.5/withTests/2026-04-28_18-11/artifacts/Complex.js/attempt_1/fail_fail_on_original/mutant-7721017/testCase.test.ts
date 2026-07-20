import { Complex } from "./complex.js";

describe("Complex.pow", () => {
  it("should correctly handle pow(0, 0) as NaN", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.isNaN()).toBe(true);
  });
});