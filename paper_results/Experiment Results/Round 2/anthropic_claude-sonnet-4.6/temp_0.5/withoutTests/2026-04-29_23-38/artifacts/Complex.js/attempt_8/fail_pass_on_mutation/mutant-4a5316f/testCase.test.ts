import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(0+2i) imaginary part should match -atan(0.5)", () => {
    // acoth(0+2i): a=0, b=2, d=4
    // d !== 0 branch: new Complex(0/4, -2/4).atanh() = new Complex(0, -0.5).atanh()
    // atanh(0 - 0.5i) = -i*atan(0.5) ≈ -0.4636476i
    // Mutation would give new Complex(0, +0.5).atanh() = +i*atan(0.5) ≈ +0.4636476i
    const result = new Complex(0, 2).acoth();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.atan(0.5), 10);
  });
});