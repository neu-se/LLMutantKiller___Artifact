import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the hypot function correctly', () => {
    const a = 3001;
    const b = 1;
    const complex = new Complex(a, b);
    const result = complex.abs();
    expect(result).toBeCloseTo(3001.000166611125);
  });
});