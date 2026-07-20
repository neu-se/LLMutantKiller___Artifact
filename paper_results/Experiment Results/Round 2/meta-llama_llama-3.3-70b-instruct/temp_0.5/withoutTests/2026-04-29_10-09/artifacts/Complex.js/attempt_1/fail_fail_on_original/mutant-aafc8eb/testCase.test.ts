import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cos().sub(1);
    expect(result.re).toBeCloseTo(-0.0009765625, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});