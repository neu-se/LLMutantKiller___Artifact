import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for asec', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asec();
    const expectedReal = 2.0943951023931953;
    const expectedImaginary = 0;
    expect(result.re).toBeCloseTo(expectedReal, 6);
    expect(result.im).toBeCloseTo(expectedImaginary, 6);
  });
});