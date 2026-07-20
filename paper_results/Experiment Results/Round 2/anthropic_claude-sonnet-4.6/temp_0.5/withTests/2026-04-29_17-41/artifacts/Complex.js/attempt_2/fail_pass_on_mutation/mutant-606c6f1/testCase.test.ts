import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add with infinity", () => {
  it("should return Infinity string when adding finite number to infinite complex number", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.add(finite);
    expect(result.toString()).toBe("Infinity");
  });
});