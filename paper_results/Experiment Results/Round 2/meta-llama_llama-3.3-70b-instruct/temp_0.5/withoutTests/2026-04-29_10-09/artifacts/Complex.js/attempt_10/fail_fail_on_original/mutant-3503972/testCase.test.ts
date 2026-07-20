import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.im).toBeLessThan(0);
  });
});