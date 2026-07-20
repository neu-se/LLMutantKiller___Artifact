import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should export the Complex class as the default export', () => {
    expect(Complex).toBeDefined();
    expect(Complex.prototype).toBeDefined();
    expect(typeof Complex).toBe('function');
  });
});