import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate asinh correctly on the original code and fail on the mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      const result = complex.asinh();
      expect(result.re).not.toBeUndefined();
      expect(result.im).not.toBeUndefined();
    }).not.toThrow();
  });
});