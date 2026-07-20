import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate atan correctly for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});