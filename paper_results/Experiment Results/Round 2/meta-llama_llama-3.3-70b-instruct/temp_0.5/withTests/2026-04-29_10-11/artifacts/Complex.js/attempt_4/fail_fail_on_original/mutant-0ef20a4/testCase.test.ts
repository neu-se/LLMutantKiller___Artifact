import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asech of zero correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.asech();
    expect(result.toString()).toBe('Infinity');
  });
});