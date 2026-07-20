import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent for a specific case', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.im).not.toBe(0);
  });
});