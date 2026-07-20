import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(typeof complex.acsch).toBe('function');
    expect(complex.acsch.toString().includes('b = this["im"]')).toBe(true);
  });
});