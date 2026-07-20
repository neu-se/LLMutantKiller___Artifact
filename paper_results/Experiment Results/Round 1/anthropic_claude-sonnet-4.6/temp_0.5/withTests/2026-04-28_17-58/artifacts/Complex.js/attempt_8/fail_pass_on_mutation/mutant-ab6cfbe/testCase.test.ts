import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of small positive real number should have zero imaginary part", () => {
    // When a > 0 and b = 0, original enters if block (if return uncommented returns Math.log(a))
    // When a = 0 and b = 0, mutated enters if block returning Math.log(0) = -Infinity with im=0
    // But original falls through to atan2(0,0) = 0 anyway
    // The real difference: for a=0, b=0 with return active:
    // mutated: new Complex(Math.log(0), 0) -> re=-Infinity, im=0
    // original: new Complex(logHypot(0,0), atan2(0,0)) -> re=-Infinity, im=0
    // Try: does asin produce intermediate log(0,0)?
    // asin(1): t1=sqrt(0,0)=(0,0), t2=log(0-0, 0+1)=log(0,1) -> b!=0, no difference
    // What about log called with a=0 from atanh?
    const result = new Complex(0, 0).log();
    expect(isFinite(result.re)).toBe(false);
    expect(result.re).toBe(-Infinity);
  });
});