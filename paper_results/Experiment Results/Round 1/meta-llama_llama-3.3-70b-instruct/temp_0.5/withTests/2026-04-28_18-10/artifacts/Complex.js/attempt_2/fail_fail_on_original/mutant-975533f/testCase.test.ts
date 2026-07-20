import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle acoth correctly', () => {
    const complex = new Complex(2, 1);
    const resultOriginal = new Complex(2, -1).acoth();
    const resultMutated = complex.acoth();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im);
  });
});