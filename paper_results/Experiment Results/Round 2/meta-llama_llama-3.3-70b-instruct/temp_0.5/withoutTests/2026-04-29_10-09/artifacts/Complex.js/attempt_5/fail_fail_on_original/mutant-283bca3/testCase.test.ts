import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cosecans correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const expected = new Complex(-0.5403023058681398, 0.4054651081081642);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});