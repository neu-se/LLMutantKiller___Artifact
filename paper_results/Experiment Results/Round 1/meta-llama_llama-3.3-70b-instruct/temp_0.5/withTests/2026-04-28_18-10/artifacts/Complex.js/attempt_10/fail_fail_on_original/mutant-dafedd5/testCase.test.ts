import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate ceil with decimal places', () => {
    const complex = new Complex(12345, 6789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(12300, 2);
    expect(result.im).toBeCloseTo(6800, 2);
  });
});