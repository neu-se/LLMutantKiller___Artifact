import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("detects mutation in acosh else branch", () => {
    // Use z = 3 + 4i and verify acosh result
    // We'll compute expected value independently
    // acosh(z) = log(z + sqrt(z^2 - 1))
    // z = 3+4i, z^2 = 9+24i-16 = -7+24i
    // z^2-1 = -8+24i
    // sqrt(-8+24i): r=sqrt(64+576)=sqrt(640)=8sqrt(10), arg=atan2(24,-8)
    // sqrt has r=sqrt(8sqrt(10)), arg=atan2(24,-8)/2
    const z = new Complex(3, 4);
    const result = z.acosh();
    
    // Compute reference: acosh(3+4i) = log(3+4i + sqrt((3+4i)^2-1))
    const z2minus1 = new Complex(3*3 - 4*4 - 1, 2*3*4); // = -8+24i
    const sqrtVal = z2minus1.sqrt();
    const logArg = new Complex(3 + sqrtVal.re, 4 + sqrtVal.im);
    const expected = logArg.log();
    
    expect(result.re).toBeCloseTo(expected.re, 8);
    expect(result.im).toBeCloseTo(expected.im, 8);
  });
});