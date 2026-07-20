import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.5, 10);
  });
});