import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const cosm1 = c.cos().re - 1;
    const expected = Math.cos(x) - 1;
    expect(cosm1).toBeCloseTo(expected, 10);
  });
});