import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of real number 2 returns atan2(1,2) not PI/2', () => {
    // Original: if (b === 0) return new Complex(Math.atan2(1, a), 0)
    // Mutated: if (true) return new Complex(0, Math.PI / 2) -- always returns this
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.atan2(1, 2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});