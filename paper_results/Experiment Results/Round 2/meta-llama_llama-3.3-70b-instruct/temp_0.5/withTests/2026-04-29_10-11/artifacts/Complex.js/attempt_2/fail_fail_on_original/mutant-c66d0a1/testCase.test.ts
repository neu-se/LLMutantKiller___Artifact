import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate acsc correctly', () => {
    const complex = new Complex(1, 1);
    const acsc = complex.acsc();
    expect(acsc.re).toBeCloseTo(-0.4636476090008061, 5);
    expect(acsc.im).toBeCloseTo(-0.4636476090008061, 5);
  });
});