import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle NaN values correctly', () => {
    const complex = new Complex(NaN, NaN);
    expect(complex.re).toBeNaN();
    expect(complex.im).toBeNaN();
  });
});