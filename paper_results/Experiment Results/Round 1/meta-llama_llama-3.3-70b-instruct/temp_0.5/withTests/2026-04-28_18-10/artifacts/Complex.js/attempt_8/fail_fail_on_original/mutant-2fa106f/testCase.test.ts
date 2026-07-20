import { Complex } from "../../complex";

describe('Complex', () => {
  it('should return a Complex object when atan is called with b equal to 1 and a equal to 0', () => {
    const complex = new Complex(0, 1);
    expect(complex.atan).not.toThrow();
  });
});