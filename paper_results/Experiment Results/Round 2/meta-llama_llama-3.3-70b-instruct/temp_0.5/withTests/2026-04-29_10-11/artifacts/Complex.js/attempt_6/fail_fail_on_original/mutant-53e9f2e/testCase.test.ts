import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate atanh for the value 2', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340549);
    expect(result.im).toBeCloseTo(0);
  });
});