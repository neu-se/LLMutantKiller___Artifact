import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result.re).toBeCloseTo(2);
    expect(result.im).toBeCloseTo(4);
  });
});