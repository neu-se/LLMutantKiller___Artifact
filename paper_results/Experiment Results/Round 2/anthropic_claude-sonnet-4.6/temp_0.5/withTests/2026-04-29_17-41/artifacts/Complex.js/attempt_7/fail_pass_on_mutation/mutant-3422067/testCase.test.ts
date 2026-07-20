import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs', () => {
  it('abs of large complex with equal components', () => {
    const c = new Complex(3000, 3000);
    expect(c.abs()).toBeGreaterThan(4242.64068711928);
    expect(c.abs()).toBeLessThan(4242.64068711929);
  });
});