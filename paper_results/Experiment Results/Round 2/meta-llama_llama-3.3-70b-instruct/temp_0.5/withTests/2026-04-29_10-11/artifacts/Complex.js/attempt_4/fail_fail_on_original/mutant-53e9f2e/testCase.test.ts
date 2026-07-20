import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });
});