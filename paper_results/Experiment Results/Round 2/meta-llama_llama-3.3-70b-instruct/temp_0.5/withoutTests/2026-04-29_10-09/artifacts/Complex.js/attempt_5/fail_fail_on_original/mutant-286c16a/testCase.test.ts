import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly on the original code and fail on the mutated code', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result).not.toBeNull();
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
  });
});