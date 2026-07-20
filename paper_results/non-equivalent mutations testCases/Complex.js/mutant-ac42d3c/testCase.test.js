const path = require('node:path');

describe('Complex atan signed-zero behavior', () => {
  it('returns +0 real part, not -0, for atan(-0 - i)', () => {
    const modulePath = process.env.COMPLEX_PATH
      ? path.resolve(process.env.COMPLEX_PATH)
      : path.resolve(__dirname, '../../subject_repositories/Complex.js/complex.js');

    delete require.cache[require.resolve(modulePath)];
    const Complex = require(modulePath);

    const z = new Complex(-0, -1).atan();

    expect(Object.is(z.re, -0)).toBe(false);
    expect(z.im).toBe(-Infinity);
  });
});
