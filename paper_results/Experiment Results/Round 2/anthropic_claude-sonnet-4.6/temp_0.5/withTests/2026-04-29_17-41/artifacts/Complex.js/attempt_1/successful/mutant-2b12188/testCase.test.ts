import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(2) returning a real number approximately 1.317", () => {
    const result = new Complex(2, 0).acosh();
    const expected = Math.acosh(2); // approximately 1.3169578969248166
    
    // With the mutation, res[""] is undefined, so tmp = undefined
    // Then res['im'] = tmp = undefined (NaN), causing incorrect result
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});