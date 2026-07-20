import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific case', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    const expectedImaginaryPart = result.im;
    expect(expectedImaginaryPart).toBeCloseTo(0);
  });
});