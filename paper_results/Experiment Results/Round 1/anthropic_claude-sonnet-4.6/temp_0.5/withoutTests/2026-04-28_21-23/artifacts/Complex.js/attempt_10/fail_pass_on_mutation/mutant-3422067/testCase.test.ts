import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex div', () => {
  it('division where |c| equals |d|', () => {
    // div uses Math.abs(c) < Math.abs(d) comparison
    // but that's not the mutated line
    // Let's test division with equal denominators
    const c = new Complex(1, 1);
    const d = new Complex(1, -1);
    const result = c.div(d);
    // (1+i)/(1-i) = (1+i)^2/((1-i)(1+i)) = (2i)/2 = i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});