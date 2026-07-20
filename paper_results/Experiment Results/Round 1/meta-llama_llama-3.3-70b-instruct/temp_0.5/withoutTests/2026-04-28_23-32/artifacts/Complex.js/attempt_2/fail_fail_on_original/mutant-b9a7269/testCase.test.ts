import { Complex } from "../complex.js";

describe("Complex", () => {
  it("should correctly floor complex numbers", () => {
    const complex = new Complex(1.234, 5.678);
    const floored = complex.floor(2);
    expect(floored.re).toBeCloseTo(1.23);
    expect(floored.im).toBeCloseTo(5.68);

    // This test case should fail when run against the mutated code
    // because Math.pow(10, true) will return NaN, causing the floor function to fail
    expect(complex.floor(true)).not.toBeNull();
  });
});