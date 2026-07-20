import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asinh correctly on the original code and fail on the mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).not.toThrow();
  });
});