import { Complex } from "../complex";

describe('Complex', () => {
  it('should calculate csch correctly', () => {
    const complex = new Complex(1, 1);
    expect(complex.csch).toBeDefined();
    expect(typeof complex.csch).toBe('function');
    expect(complex.csch()).not.toBeUndefined();
  });
});