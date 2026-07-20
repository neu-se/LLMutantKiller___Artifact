import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should have an acot method that returns a Complex instance', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result instanceof Complex).toBe(true);
  });
});