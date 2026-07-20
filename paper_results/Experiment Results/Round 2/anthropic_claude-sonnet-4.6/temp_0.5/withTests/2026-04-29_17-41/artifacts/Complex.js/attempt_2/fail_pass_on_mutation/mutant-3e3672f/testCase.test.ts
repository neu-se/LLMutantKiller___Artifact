import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase I imaginary unit", () => {
  it("should parse a complex number string using uppercase I without throwing", () => {
    expect(() => {
      const c = new Complex("3+2I");
      expect(c.re).toBeCloseTo(3);
      expect(c.im).toBeCloseTo(2);
    }).not.toThrow();
  });
});