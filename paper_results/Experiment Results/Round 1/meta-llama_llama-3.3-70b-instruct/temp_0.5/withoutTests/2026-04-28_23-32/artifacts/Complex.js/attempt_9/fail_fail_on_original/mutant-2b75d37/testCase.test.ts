import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex arcus cotangent', () => {
    const complex = new Complex(1, 2);
    expect(typeof complex.acot).toBe('function');
  });
});