import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate abs correctly for specific numbers', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
    const complexLarge = new Complex(1000000, 0);
    expect(complexLarge.abs()).toBeCloseTo(1000000);
  });
});