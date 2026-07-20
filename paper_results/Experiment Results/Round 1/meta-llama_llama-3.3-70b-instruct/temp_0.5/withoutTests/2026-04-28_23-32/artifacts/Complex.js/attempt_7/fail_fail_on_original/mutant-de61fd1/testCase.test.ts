import { Complex } from "../complex";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    const expected = new Complex(0.6630376474389426, 0);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});