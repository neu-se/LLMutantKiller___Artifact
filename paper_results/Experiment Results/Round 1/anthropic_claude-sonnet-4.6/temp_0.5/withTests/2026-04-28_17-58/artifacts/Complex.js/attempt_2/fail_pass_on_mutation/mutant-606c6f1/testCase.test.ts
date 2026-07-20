import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinity", () => {
  it("should return Infinity string when adding finite complex to infinite complex", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    const result = inf.add(finite);
    expect(result.toString()).toBe("Infinity");
  });
});