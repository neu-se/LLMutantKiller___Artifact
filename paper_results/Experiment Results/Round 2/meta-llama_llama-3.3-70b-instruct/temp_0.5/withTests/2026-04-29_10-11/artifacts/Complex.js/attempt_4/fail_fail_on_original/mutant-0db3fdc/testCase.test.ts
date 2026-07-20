import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.1;
    const resultOriginal = Math.cos(x) - 1;
    const complex = new Complex(x);
    const cosm1Result = complex.expm1().re - x;
    expect(cosm1Result).toBeCloseTo(resultOriginal, 10);
    const xSmall = 0.000001;
    const resultSmallOriginal = Math.cos(xSmall) - 1;
    const complexSmall = new Complex(xSmall);
    const cosm1ResultSmall = complexSmall.expm1().re - xSmall;
    expect(cosm1ResultSmall).toBeCloseTo(resultSmallOriginal, 10);
  });
});