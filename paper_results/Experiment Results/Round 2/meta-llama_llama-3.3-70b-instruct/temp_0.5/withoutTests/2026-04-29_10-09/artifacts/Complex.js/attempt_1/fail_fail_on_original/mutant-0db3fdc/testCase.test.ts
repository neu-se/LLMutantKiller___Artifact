import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(Math.PI / 4) * Math.cos(Math.PI / 4) - 1, Math.exp(Math.PI / 4) * Math.sin(Math.PI / 4));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});