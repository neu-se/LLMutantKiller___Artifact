import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate atan correctly for a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(complex.atan().re).toBeCloseTo(Math.PI / 2);
    expect(complex.atan().im).toBeCloseTo(0);
  });
});