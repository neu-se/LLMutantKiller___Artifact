import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate atan correctly for complex numbers with b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});