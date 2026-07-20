import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return real part of exactly positive zero for atan of Complex(0, -1)", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original explicitly returns new Complex(0, -Infinity) - re is +0
    // Mutated computes -0.5 * t1['im'] where t1['im'] could be +0 or -0
    // If re is -0, then (1/re) === -Infinity; if re is +0, then (1/re) === +Infinity
    // But we need to find what t1['im'] actually is in mutated code
    // t1 = log(Complex(0,0)): logHypot(0,0) = -Infinity, atan2(0,0) = 0
    // So t1 = Complex(-Infinity, 0), t1['im'] = +0
    // result.re = -0.5 * (+0) = -0
    // So mutated gives re = -0, original gives re = +0
    expect(result.im).toBe(-Infinity);
    // Multiply re by -1 to flip sign: +0 * -1 = -0, -0 * -1 = +0
    // Then check: is (-result.re) negative zero?
    const negRe = -result.re;
    // If original: re=+0, negRe=-0, (1/negRe)=-Infinity
    // If mutated: re=-0, negRe=+0, (1/negRe)=+Infinity  
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.re, -0)).toBe(false);
  });
});