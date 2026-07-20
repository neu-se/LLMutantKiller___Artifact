import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acoth when a is not 0 and b is not 0', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = complex.acoth();
    const complexMutated = new Complex(0, 0);
    const resultMutated = complexMutated.acoth();
    expect(resultOriginal.toString()).not.toBe(resultMutated.toString());
  });
});