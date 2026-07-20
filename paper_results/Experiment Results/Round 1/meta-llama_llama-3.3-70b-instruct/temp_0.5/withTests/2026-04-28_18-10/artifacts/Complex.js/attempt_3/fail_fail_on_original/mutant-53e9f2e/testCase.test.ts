import { Complex } from './complex';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});