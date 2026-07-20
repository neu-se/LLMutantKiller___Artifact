import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch normal path with imaginary input should give correct result", () => {
    // acsch(i/2) = acsch(0 + 0.5i)
    // For purely imaginary z = bi: acsch(bi) = -i*acsc(b)
    // acsc(0.5) = pi/2 - acos(0.5) ... let's use known formula
    // acsch(0 + 1i) = -i * pi/2
    const result = new Complex(0, 1).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});