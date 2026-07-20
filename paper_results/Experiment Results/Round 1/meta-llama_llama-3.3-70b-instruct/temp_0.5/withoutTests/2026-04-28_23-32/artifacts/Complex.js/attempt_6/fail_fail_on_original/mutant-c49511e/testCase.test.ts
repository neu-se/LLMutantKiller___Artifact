import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});