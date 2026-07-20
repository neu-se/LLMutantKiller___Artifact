import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return correct imaginary part sign when a=0 and b is extremely small causing d to underflow", () => {
    // a=0, b=5e-200: d = 0^2 + (5e-200)^2 underflows to 0
    // a===0 so a/0 = 0; b!==0 so original: -b/0 = -Inf, mutated: +b/0 = +Inf
    // atanh(0 - Inf*i) = -i*pi/4, atanh(0 + Inf*i) = +i*pi/4
    const result = new Complex(0, 5e-200).acoth();
    // atanh(0 - Inf*i): atanh of pure imaginary -Inf*i = -i*atan(Inf) = -i*pi/2
    // So acoth(0 + 5e-200*i) should have negative imaginary part
    expect(result.im).toBeLessThan(0);
  });
});