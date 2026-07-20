import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should not return undefined when calling sech', () => {
    const complex = new Complex(1, 2);
    const result = complex.sech();
    expect(result).not.toBeUndefined();
  });
});