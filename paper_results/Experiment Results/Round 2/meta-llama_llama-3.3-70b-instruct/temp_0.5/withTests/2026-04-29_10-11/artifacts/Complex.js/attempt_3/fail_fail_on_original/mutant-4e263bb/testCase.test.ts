import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acoth().re).not.toBe(complex[""].re);
  });
});