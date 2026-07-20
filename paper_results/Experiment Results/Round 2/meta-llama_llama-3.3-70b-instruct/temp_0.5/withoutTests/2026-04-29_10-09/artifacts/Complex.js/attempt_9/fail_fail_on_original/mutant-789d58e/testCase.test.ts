import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const cosm1 = c.cos().re - 1;
    const expected = Math.cos(x) - 1;
    expect(cosm1).toBeCloseTo(expected, 10);
    const largeX = 1000;
    const largeC = new Complex(largeX, 0);
    const largeCosm1 = largeC.cos().re - 1;
    expect(largeCosm1).not.toBeCloseTo(expected, 10);
  });
});