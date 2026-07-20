import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate log correctly for a specific case', () => {
    const complex = new Complex(1);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});