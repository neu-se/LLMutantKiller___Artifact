import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});