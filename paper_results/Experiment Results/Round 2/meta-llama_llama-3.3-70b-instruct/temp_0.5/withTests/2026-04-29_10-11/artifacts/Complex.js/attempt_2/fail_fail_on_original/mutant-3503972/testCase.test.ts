import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acsch();
    const complexMutated = new Complex(1, -1);
    const resultMutated = complexMutated.acsch();
    expect(resultOriginal.re).not.toEqual(resultMutated.re);
  });
});