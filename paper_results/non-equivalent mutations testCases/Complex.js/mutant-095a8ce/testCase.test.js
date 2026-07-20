const path = require('node:path');

describe('Complex asec zero input behavior', () => {
  it('returns 0 + Infinity i for asec(0)', () => {
    const modulePath = process.env.COMPLEX_PATH
      ? path.resolve(process.env.COMPLEX_PATH)
      : path.resolve(__dirname, '../../subject_repositories/Complex.js/complex.js');

    delete require.cache[require.resolve(modulePath)];
    const Complex = require(modulePath);

    const z = new Complex(0, 0).asec();

    expect(z.re).toBe(0);
    expect(z.im).toBe(Infinity);
  });
});
