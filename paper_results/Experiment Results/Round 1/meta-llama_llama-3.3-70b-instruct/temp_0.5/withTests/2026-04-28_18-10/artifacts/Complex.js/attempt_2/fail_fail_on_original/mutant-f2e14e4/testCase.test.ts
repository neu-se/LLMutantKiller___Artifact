import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 1);
    const acotOriginal = new Complex(1, -1).acot();
    const acotMutated = complexNumber.acot();
    expect(acotOriginal.re).not.toEqual(acotMutated.re);
    expect(acotOriginal.im).not.toEqual(acotMutated.im);
  });
});