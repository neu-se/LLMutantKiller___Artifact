import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const complexWithNewline = new Complex('1+\n2i');
    expect(complexWithNewline.re).toBe(1);
    expect(complexWithNewline.im).toBe(2);
  });
});