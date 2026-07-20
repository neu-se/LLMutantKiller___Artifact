import { Complex } from "../../../../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(-0.46364760900080615, 5);
  });
});