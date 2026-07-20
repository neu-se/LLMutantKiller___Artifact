import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse an object with both "re" and "im" properties', () => {
    const complex = new Complex({ re: 1, im: 2 });
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });

  it('should throw an error when parsing an object with only one of "re" or "im" properties', () => {
    expect(() => new Complex({ re: 1 })).toThrow();
    expect(() => new Complex({ im: 1 })).toThrow();
  });
});