import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate asech correctly for b = 0 in original code and fail in mutated code', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.asech().re).not.toBeNaN();
    expect(complex.asech().im).not.toBeNaN();
  });
});