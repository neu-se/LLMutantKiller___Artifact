import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    expect(() => {
      const result = complex.acsch();
      expect(result.re).toBeGreaterThan(0);
    }).not.toThrow();
  });
});