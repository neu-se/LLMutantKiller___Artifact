import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex acoth correctly for a specific case', () => {
    const complex = new Complex(2, 1);
    const resultOriginal = new Complex(2, 1).acoth();
    const resultMutated = new Complex(2, -1).acoth();
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});