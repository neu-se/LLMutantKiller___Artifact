import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.4722194895837705, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});