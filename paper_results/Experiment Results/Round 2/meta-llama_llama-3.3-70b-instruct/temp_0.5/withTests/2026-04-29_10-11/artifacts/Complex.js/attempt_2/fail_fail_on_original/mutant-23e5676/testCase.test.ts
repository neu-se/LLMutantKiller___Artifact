import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acsc();
    const resultMutated = complex.acsc();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
  });
});