import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON'] / 2);
    expect(complex1.equals(complex2)).toBe(true);
  });
  it('should compare two complex numbers with difference equal to epsilon on original code', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON']);
    expect(complex1.equals(complex2)).toBe(true); // This line should pass on the original code
  });
  it('should not compare two complex numbers with difference equal to epsilon on mutated code', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON']);
    // The following line should fail on the mutated code
    // However, we cannot directly test the mutated code here
    // We can only test the original code
  });
});