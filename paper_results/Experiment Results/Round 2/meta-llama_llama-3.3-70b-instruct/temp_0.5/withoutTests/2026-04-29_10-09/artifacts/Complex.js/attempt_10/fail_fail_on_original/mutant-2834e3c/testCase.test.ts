import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate asech correctly for b = 0 in original code and fail in mutated code', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0.881, 3);
    expect(result.im).toBeCloseTo(0, 3);
    expect(complex.asech().re).toBeCloseTo(0.881, 3);
    expect(complex.asech().im).toBeCloseTo(0, 3);
  });
});