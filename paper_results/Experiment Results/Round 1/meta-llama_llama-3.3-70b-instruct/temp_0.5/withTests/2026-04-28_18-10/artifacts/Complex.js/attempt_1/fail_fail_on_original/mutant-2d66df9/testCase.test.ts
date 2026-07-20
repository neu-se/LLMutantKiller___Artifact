import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with different signs', () => {
    const complexNumber1 = new Complex('1+2i');
    const complexNumber2 = new Complex('1-2i');
    const complexNumber3 = new Complex('-1+2i');
    const complexNumber4 = new Complex('-1-2i');

    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(-2);
    expect(complexNumber3.re).toBe(-1);
    expect(complexNumber3.im).toBe(2);
    expect(complexNumber4.re).toBe(-1);
    expect(complexNumber4.im).toBe(-2);
  });
});