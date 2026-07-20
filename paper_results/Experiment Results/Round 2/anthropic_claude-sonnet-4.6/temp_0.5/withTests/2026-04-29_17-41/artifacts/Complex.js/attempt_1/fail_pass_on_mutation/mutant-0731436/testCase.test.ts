import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec mutation test", () => {
  it("should compute asec correctly for a purely imaginary number where b !== 0", () => {
    // When a=0 and b≠0, d = b*b ≠ 0, so we go into the d !== 0 branch
    // asec(i) = acos(1/i) = acos(-i)
    // The mutation affects the d===0 branch's imaginary part computation
    // We need to find a case where d=0 but b≠0 - impossible normally
    // Instead test that asec of a purely imaginary number works
    const c = new Complex(0, 1); // i
    const result = c.asec();
    // asec(i) = acos(-i) 
    // acos(-i): t1 = sqrt(1 - (-i)^2) = sqrt(1 - (-1)) = sqrt(2)
    const expected = new Complex(0, 1).inverse().acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});