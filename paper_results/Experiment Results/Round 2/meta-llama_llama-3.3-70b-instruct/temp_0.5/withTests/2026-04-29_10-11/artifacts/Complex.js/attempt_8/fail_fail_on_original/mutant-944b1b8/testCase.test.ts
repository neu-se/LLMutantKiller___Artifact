import { Complex } from './complex';

describe('Complex', () => {
  it('should return correct value for asech when a is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
  });
});