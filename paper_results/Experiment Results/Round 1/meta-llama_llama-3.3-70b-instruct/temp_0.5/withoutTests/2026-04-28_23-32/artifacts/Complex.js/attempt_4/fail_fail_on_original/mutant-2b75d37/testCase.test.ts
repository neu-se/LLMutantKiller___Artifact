import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus cotangent', () => {
    const complex = new Complex(1, 2);
    expect(complex.acot).toBeInstanceOf(Function);
  });
});