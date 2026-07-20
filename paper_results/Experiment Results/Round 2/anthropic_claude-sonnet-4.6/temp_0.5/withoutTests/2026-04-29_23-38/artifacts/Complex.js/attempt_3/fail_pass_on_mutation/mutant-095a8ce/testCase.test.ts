import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc with zero", () => {
  it("acsc(0) imaginary part should be Infinity, not 0", () => {
    const z = new Complex(0, 0);
    const result = (z as any)['acsc']();
    expect(result['im']).toBe(Infinity);
  });
});