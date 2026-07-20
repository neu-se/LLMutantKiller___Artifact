import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error when calculating csch with mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => {
      const result = complex.csch();
      if (result.re === undefined || result.im === undefined) {
        throw new Error('csch calculation failed');
      }
    }).toThrowError('csch calculation failed');
  });
});