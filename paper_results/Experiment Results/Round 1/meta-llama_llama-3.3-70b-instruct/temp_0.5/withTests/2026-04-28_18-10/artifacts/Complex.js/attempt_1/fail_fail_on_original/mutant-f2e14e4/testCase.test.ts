import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cotangent', () => {
    const complexNumber = new Complex(1, 2);
    const acot = complexNumber.acot();
    expect(acot.re).toBeCloseTo(-0.4576575543602858);
    expect(acot.im).toBeCloseTo(-0.5505102577780744);
  });
});