const path = require('node:path');

describe('Complex asinh behavior', () => {
  it('returns 0 + PI/2 i for asinh(i)', () => {
    const modulePath = process.env.COMPLEX_PATH
      ? path.resolve(process.env.COMPLEX_PATH)
      : path.resolve(__dirname, '../../subject_repositories/Complex.js/complex.js');

    delete require.cache[require.resolve(modulePath)];
    const Complex = require(modulePath);

    const z = new Complex(0, 1).asinh();

    expect(z.re).toBe(0);
    expect(z.im).toBeCloseTo(Math.PI / 2, 12);
  });
});
