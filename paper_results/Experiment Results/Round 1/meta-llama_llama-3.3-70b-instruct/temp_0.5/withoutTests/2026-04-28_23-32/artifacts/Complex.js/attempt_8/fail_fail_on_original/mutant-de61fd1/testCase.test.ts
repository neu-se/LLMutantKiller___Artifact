import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.6630376474389426);
    expect(result.im).toBeCloseTo(0);
    const mutatedResult = new Complex(1, 0);
    mutatedResult.sech();
    expect(mutatedResult.re).not.toBeCloseTo(0.6630376474389426);
  });
});