import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers and fail for mutated code', () => {
    const complex = new Complex(1, 1);
    const acsch = complex.acsch();
    const expectedReal = -0.4812;
    const expectedImaginary = -0.3985;
    expect(acsch.re).toBeCloseTo(expectedReal, 4);
    expect(acsch.im).toBeCloseTo(expectedImaginary, 4);
  });
});