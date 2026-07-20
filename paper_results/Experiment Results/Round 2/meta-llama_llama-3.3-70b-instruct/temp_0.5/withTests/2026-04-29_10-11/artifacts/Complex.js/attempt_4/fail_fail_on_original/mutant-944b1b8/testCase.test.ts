import { Complex } from './complex';

describe('Complex', () => {
  it('should return correct value for asech when input is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.asech();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});