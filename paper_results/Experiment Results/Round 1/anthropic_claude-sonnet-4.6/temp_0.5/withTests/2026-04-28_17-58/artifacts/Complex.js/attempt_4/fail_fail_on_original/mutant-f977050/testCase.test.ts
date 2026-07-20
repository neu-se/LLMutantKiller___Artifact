import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('detects mutation in else branch by checking im value for input hitting else branch', () => {
    // For acosh(-2), acos(-2) ≈ π + 1.317i (positive im), hits else branch
    // Original else: res['im'] = -res['re'] where res['re'] = π ≈ 3.14159
    // So im = -π ≈ -3.14159
    // Mutated else: res['im'] = -res[""] = -undefined = NaN
    const result = new Complex(-2, 0).acosh();
    // im should be -π in original, NaN in mutated
    expect(result.im).toBeCloseTo(-Math.PI, 5);
  });
});