import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not return NaN when a is not zero in asech', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});