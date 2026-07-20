import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings with different whitespace characters', () => {
    const complexNumber1 = new Complex('1+2i ');
    expect(complexNumber1.re).toBe(1);
    expect(complexNumber1.im).toBe(2);

    const complexNumber2 = new Complex('1+2i\t');
    expect(complexNumber2.re).toBe(1);
    expect(complexNumber2.im).toBe(2);

    const complexNumber3 = new Complex('1+2i\n');
    expect(complexNumber3.re).toBe(1);
    expect(complexNumber3.im).toBe(2);
  });
});