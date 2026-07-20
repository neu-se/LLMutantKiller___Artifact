import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});