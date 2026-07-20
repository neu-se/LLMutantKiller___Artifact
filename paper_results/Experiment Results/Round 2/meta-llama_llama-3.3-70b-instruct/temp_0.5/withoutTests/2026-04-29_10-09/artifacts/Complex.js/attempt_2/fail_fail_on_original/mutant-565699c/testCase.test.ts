import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(new Complex(1, 0));
    const expected = new Complex(Math.cos(x) - 1, 0);
    expect(result.equals(expected)).toBe(true);
  });
});