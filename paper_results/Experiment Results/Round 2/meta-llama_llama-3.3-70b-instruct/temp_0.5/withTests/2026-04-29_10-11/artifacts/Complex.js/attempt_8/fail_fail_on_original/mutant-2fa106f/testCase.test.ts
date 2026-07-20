import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle atan for complex number with real part 0 and imaginary part 1', () => {
    const complexNumber = new Complex(0, 1);
    const result = complexNumber.atan();
    expect(result.im).toBeCloseTo(Infinity, 10);
  });

  it('should throw an error when calculating atan for complex number with real part 0 and imaginary part 1 in the mutated code', () => {
    const complexNumber = new Complex(0, 1);
    expect(() => {
      const result = complexNumber.atan();
      if (result.im === Infinity) {
        throw new Error('atan result is Infinity');
      }
    }).toThrowError();
  });
});