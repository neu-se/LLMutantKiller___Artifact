import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero input and fail for mutated code', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0.46364760900080615, 4);
    expect(result.im).toBeCloseTo(-0.5205008792933656, 4);
    const zeroComplex = new Complex(0, 0);
    const zeroResult = zeroComplex.acsc();
    expect(zeroResult.re).toBeCloseTo(Math.PI / 2, 4);
    expect(zeroResult.im).toBeCloseTo(Infinity, 4);
  });
});