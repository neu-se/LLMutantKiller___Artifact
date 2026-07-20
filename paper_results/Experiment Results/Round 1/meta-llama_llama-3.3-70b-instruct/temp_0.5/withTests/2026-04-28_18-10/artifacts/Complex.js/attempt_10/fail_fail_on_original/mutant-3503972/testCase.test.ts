import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(0, 1);
    const resultOriginal = complex.acsch();
    const complexMutated = new Complex(0, -1);
    const resultMutated = complexMutated.acsch();
    expect(resultOriginal.re).not.toBe(resultMutated.re);
  });
});