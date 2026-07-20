import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(10.12345, 20.6789);
    const result = complex.ceil(4);
    expect(result.re).toBeCloseTo(10.125, 3);
    expect(result.im).toBeCloseTo(20.679, 3);
    // Test case to check if the mutated code fails
    const complex2 = new Complex(10.12345, 20.6789);
    const result2 = complex2.ceil(1);
    expect(result2.re).not.toBeCloseTo(10.1, 1);
  });
});