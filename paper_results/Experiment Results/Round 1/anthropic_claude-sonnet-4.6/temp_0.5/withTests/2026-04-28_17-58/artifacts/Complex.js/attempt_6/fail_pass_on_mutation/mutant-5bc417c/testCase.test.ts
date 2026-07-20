import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(0) should produce finite result in original but NaN in mutated", () => {
    const result = new Complex(0, 0).acoth();
    // Original: d=0, else branch: new Complex(0, 0).atanh() -> re=0, im=0
    // Mutated: if(true) branch: new Complex(0/0, 0).atanh() -> NaN
    expect(result.isNaN()).toBe(false);
  });
});