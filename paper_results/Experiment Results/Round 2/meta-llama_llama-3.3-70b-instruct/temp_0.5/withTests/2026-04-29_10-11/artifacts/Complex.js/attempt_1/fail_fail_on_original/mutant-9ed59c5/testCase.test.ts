import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should be exported as a module', () => {
    expect(Complex).toBeDefined();
    expect(typeof Complex).toBe('function');
    const complexInstance = new Complex(1, 2);
    expect(complexInstance).toBeInstanceOf(Complex);
  });
});