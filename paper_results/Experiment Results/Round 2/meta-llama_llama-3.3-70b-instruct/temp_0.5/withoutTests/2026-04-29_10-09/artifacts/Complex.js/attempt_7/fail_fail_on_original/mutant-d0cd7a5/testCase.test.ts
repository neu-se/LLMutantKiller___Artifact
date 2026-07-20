import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    expect(result.im).toBeLessThan(0);
  });
});