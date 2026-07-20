import { Complex } from "./complex.js";

describe("Complex", () => {
  it("should return the correct result for the sech function", () => {
    // arrange
    const complex = new Complex(1, 0);

    // act
    const result = complex.sech();

    // assert
    expect(result.re).toBeCloseTo(0.6630376474389426);
    expect(result.im).toBeCloseTo(0);
  });
});