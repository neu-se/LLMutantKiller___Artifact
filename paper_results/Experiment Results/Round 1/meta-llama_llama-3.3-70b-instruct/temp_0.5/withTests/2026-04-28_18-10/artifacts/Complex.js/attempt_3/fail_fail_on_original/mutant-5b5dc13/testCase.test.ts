import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a === 0 and b !== 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(Math.PI / 2, 5);
  });

  it('should calculate acsch correctly for a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acsch()).toThrowError(SyntaxError);
  });
});