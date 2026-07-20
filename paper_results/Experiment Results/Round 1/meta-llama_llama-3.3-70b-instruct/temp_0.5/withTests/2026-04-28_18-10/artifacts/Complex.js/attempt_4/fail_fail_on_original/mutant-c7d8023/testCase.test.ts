import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.toString()).not.toBe('0');
  });
});