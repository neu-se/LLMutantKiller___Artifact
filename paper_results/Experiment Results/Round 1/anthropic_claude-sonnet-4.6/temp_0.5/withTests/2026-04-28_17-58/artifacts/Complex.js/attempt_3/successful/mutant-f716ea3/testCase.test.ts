import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return correct real part for atanh(1+0i)", () => {
    // When a=1, b=0: d=(1-1)^2+0=0, else branch triggered
    // Original x.re = Infinity, x.im = 0 => logHypot(Inf,0)/2 = Inf
    // Mutated x.re = 0, x.im = 0 => logHypot(0,0)/2 = -Inf
    // noIM = false (a=1 is not > 1), so x.im = atan2(0, Inf or 0)/2
    // Original: atan2(0, Inf)/2 = 0, re = Inf => atanh(1) = Inf + 0i
    // Mutated: atan2(0, 0)/2 = 0, re = -Inf => atanh(1) = -Inf + 0i
    const result = new Complex(1, 0).atanh();
    expect(result.re).toBe(Infinity);
  });
});