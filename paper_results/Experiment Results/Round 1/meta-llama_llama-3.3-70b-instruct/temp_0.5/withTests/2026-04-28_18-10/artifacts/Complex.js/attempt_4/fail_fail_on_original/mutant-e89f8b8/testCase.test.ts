import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.8414709848078965, 10);
  });
});