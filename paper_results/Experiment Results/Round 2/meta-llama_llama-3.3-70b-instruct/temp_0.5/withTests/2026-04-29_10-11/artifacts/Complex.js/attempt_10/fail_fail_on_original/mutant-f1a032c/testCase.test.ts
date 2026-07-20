import { Complex } from '../complex';

describe('Complex', () => {
  it('should floor the imaginary part correctly', () => {
    const complex = new Complex(1.5, 2.7);
    const flooredComplex = complex.floor(1);
    expect(flooredComplex.im).toBeCloseTo(2.7);
  });
});