import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly ceil the real part of a complex number', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(1.24);
    expect(result.im).toBeCloseTo(6.79);
  });

  it('should fail when using the mutated code', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(100);
    expect(result.re).toBeCloseTo(0.01);
  });
});