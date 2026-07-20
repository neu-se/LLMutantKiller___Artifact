import { Complex } from "./complex";

describe('Complex', () => {
  it('should return a complex number with a defined real part when subtracting a finite complex number from Infinity', () => {
    const infinity = new Complex(Infinity, Infinity);
    const finite = new Complex(1, 2);
    const result = infinity.sub(finite);
    expect(result.re).toBeDefined();
  });
});