import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const z = new Complex(1, 1);
    const result = z.acsc();
    expect(result.re).toBeCloseTo(-0.46364760900080615, 5);
    expect(result.im).toBeCloseTo(-0.6881721793074264, 5);
  });
});