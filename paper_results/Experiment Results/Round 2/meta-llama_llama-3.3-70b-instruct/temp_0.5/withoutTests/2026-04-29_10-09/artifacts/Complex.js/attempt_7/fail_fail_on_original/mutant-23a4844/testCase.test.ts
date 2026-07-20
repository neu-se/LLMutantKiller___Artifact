import { Complex } from '../complex';

describe('Complex', () => {
  it('should handle atanh correctly for specific input', () => {
    const complex = new Complex(-1.5, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
    expect(complex.atanh().re).not.toBeNaN();
  });
});