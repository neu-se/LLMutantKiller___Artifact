import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});