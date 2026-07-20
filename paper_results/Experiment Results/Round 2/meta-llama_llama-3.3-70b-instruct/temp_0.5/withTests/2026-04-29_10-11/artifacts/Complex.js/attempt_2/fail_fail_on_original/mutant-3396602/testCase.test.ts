import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.2721655262589455);
    expect(result.im).toBeCloseTo(0.2721655262589455);
  });
});