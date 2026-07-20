import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string with embedded newline between operator tokens", () => {
    // Using String.fromCharCode to ensure actual newline character
    const newline = String.fromCharCode(10);
    const input = "3 +" + newline + " 4i";
    const c = new Complex(input);
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});