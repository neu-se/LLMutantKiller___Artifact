import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should not throw an error when calling sech', () => {
    const complex = new Complex(1, 2);
    expect(() => {
      const result = complex.sech();
      expect(result).not.toBeUndefined();
    }).not.toThrow();
  });
});