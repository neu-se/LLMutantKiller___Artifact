import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("acosh of pure imaginary number i has correct imaginary part", () => {
    // acos(i) has im < 0, so if branch taken - not useful
    // Need input where acos gives im > 0
    // acos(-i): re=pi/2, im=log(1+sqrt(2)) > 0, so else branch taken
    // Original: tmp=im, res['im']=-res['re']=-pi/2, res['re']=tmp=log(1+sqrt(2))
    // Mutated:  res['im']=NaN, res['re']=log(1+sqrt(2))
    const result = new Complex(0, -1).acosh();
    // im should be -pi/2
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});