import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should throw an error when calculating atan for complex number with real part 0 and imaginary part 1 in the mutated code', () => {
    const complexNumber = new Complex(0, 1);
    expect(() => {
      const result = complexNumber.atan();
      if (result.im !== Infinity) {
        throw new Error('atan result is not Infinity');
      }
    }).toThrowError();
  });
});