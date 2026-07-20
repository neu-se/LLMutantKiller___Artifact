import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh at z=1", () => {
  it("should return Infinity real part when computing atanh(1+0i)", () => {
    // When a=1, b=0: d = (1-1)^2 + 0^2 = 0, so we hit the d===0 branch
    // Original: (a !== -1) ? (a/0) : 0 => (1 !== -1) => true => 1/0 = Infinity
    // Mutated: (a === -1) ? (a/0) : 0 => (1 === -1) => false => 0
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBe(Infinity);
  });
});