const path = require('node:path');

describe('Complex asech zero-input behavior', () => {
  it('returns Complex.INFINITY for asech(0)', () => {
    const modulePath = process.env.COMPLEX_PATH
      ? path.resolve(process.env.COMPLEX_PATH)
      : path.resolve(__dirname, '../../subject_repositories/Complex.js/complex.js');

    delete require.cache[require.resolve(modulePath)];
    const Complex = require(modulePath);

    const z = new Complex(0, 0).asech();

    expect(z.re).toBe(Infinity);
    expect(z.im).toBe(Infinity);
  });
});
