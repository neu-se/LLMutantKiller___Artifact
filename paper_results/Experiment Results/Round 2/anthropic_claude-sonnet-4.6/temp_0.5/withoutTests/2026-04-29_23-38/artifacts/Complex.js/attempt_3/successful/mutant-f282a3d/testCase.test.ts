import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with standalone uppercase I", () => {
  it("should parse '3-I' treating uppercase I as imaginary unit", () => {
    // In original: standalone 'I' token is recognized as imaginary unit
    // In mutated: 'I' check replaced with '', so standalone 'I' falls to else branch calling parser_exit()
    const c = new Complex('3-I');
    expect(c.re).toBeCloseTo(3);
    expect(c.im).toBeCloseTo(-1);
  });
});