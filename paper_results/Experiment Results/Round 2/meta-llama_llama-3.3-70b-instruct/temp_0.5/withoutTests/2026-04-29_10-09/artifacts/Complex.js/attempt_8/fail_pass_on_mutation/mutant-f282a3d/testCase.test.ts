import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an empty string and not assign 1 to the imaginary part', () => {
    expect(() => {
      const complex = new Complex('');
      expect(complex.im).toBe(1);
    }).toThrow(SyntaxError);
  });
});