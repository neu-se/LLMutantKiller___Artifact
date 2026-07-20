import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate the complex arcus cotangent', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot;
    expect(acot).toBeInstanceOf(Function);
    expect(() => acot.call(complex)).not.toThrow();
  });
});