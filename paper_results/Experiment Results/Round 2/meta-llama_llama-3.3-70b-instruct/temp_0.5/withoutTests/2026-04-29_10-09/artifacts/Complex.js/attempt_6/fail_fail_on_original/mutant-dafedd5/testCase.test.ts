import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly ceil the real part of a complex number', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    expect(result.re).toBeCloseTo(1.24);
    expect(result.im).toBeCloseTo(6.79);
  });

  it('should fail when using the mutated code', () => {
    const complex = new Complex(1.2345, 6.789);
    const result = complex.ceil(2);
    // The mutated code has Math.ceil(this['re'] / places) / places, which is incorrect
    expect(result.re).not.toBeCloseTo(1.24 / 100); // This should fail on the mutated code
  });
});