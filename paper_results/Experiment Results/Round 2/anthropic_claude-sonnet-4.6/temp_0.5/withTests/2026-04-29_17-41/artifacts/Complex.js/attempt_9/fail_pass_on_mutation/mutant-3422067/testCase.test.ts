import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs', () => {
  it('abs of large complex number', () => {
    expect(new Complex(4000, 3000).abs()).toBe(5000);
  });
});