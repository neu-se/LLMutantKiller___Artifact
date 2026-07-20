import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for b === 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.toString()).toBe('Infinity');
  });
});