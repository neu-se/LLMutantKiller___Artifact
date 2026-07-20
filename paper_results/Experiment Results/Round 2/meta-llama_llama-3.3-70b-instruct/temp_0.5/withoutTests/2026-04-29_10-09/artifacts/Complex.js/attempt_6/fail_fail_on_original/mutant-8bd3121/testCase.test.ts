import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});