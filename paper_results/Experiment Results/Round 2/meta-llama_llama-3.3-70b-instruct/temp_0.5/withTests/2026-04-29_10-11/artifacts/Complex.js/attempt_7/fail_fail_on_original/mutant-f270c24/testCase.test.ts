import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate acsch for real numbers', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});