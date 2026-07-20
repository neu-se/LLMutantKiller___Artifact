import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.toString()).toBe(`0.48121182505960347 -0.48121182505960347i`);
  });
});