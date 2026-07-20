import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const originalCode = new Complex(1, 0);
    const mutatedCode = new Complex(1, 0);

    const originalResult = originalCode.asech();
    const mutatedResult = mutatedCode.asech();

    expect(originalResult.toString()).not.toBe(mutatedResult.toString());
  });
});