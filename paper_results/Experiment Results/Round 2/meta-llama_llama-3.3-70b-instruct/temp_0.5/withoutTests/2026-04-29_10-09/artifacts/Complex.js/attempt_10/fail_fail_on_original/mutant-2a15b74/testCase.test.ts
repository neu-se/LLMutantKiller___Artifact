import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const a = new Complex(1, 2);
    const b = new Complex(1, 1);
    const result = a.div(b);
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});