import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle acsc for (0, 0)', () => {
    const c = new Complex(0, 0);
    expect(() => c.acsc()).toThrow(SyntaxError);
  });
});